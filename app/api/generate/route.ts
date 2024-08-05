import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY as string,
  baseURL: "https://generativelanguage.googleapis.com/v1beta",
});

const schema = z.object({
  recipes: z.array(
    z.object({
      title: z.string(),
      ingredients: z.array(
        z.object({
          name: z.string(),
          quantity: z.string(),
          calories: z.number(),
        })
      ),
      steps: z.array(z.string()),
      duration: z.string(),
    })
  ),
});

export async function POST(req: NextRequest) {
  try {
    const {
      body,
      objective,
      diet,
      allergies,
      intolerance,
      conditions,
      budget,
      kca,
    } = await req.json();

    const caloricExpenditureMessage =
      typeof kca === "number"
        ? `1. El gasto calórico de esta persona es de ${
            objective === "bajar" ? kca - 500 : kca + 500
          } kcal.`
        : "";

    const allergiesMessage =
      allergies && allergies.length > 0
        ? `5. Alergias: ${allergies.join(", ")}`
        : "";

    const intoleranceMessage =
      intolerance && intolerance.length > 0
        ? `6. Intolerancias: ${intolerance.join(", ")}`
        : "";

    const conditionsMessage =
      conditions && conditions.length > 0
        ? `7. Condiciones médicas: ${conditions.join(", ")}`
        : "";

    const prompt = `
      Genera 4 recetas de almuerzos diferentes. Ten en cuenta los siguientes parámetros para estas recetas:
      ${caloricExpenditureMessage}
      2. Tipo de cuerpo: ${body}
      3. Objetivo: ${objective}
      4. Dieta: ${diet}
      ${allergiesMessage}
      ${intoleranceMessage}
      ${conditionsMessage}
      8. Presupuesto total para todas las recetas (presupuesto total semanal): ${budget}
      Instrucciones adicionales:
      - No incluyas ingredientes de cocina comunes como sal y aceite en la lista de ingredientes.
      - Proporciona las cantidades necesarias en gramos o unidades dependiendo del ingrediente para cocinar dos porciones de cada receta.`;

    const response = await generateObject({
      model: google("models/gemini-1.5-flash-latest"),
      temperature: 0.75,
      schema,
      prompt,
    });

    if (!response || !response.object || !response.object.recipes) {
      console.error("Invalid API response structure:", response);
      return NextResponse.json(
        { error: "Invalid API response structure" },
        { status: 500 }
      );
    }

    return NextResponse.json(response.object.recipes);
  } catch (error) {
    console.error("Error details:", error);
    return NextResponse.json(
      { error: `Failed to generate recipes: ${error}` },
      { status: 500 }
    );
  }
}
