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
    // Attempt to parse JSON body
    const data = await req.json();
    console.log("Request received:", data);

    // Extract values from the parsed data
    const {
      body,
      objective,
      diet,
      allergies,
      intolerance,
      conditions,
      budget,
      kca,
    } = data;

    // Log each value to ensure they're being parsed correctly
    console.log({
      body,
      objective,
      diet,
      allergies,
      intolerance,
      conditions,
      budget,
      kca,
    });

    // Construct the prompt based on received data
    const dietsearch =
      diet === "Omnivora"
        ? " tanto alimentos de origen animal como vegetal."
        : diet === "Lactoveg"
        ? "Con vegetales y productos lácteos, pero no huevos ni carne."
        : diet === "Ovoveg"
        ? "con vegetales y huevos, pero no lácteos ni carne."
        : diet === "Lactoovoveg"
        ? "con vegetales, lácteos y huevos, pero no carne."
        : diet === "Pescetariana"
        ? "con vegetales y pescado, pero no otras carnes."
        : diet === "vegana"
        ? "con solo alimentos de origen vegetal, sin productos animales ni derivados."
        : "";

    const caloricExpenditureMessage =
      typeof kca === "number"
        ? `1. El gasto calórico de esta persona es de ${
            objective === "bajar" ? kca - 500 : kca + 500
          } kcal.`
        : "";

    const allergiesMessage =
      allergies && allergies.length > 0
        ? `5.IMPORTANTE tener en cuenta Alergias: ${allergies.join(", ")}`
        : "";

    const intoleranceMessage =
      intolerance && intolerance.length > 0
        ? `6.IMPORTANTE tener en cuenta Intolerancias: ${intolerance.join(
            ", "
          )}`
        : "";

    const conditionsMessage =
      conditions && conditions.length > 0
        ? `7.IMPORTANTE tener en cuenta Condiciones médicas: ${conditions.join(
            ", "
          )}`
        : "";

    const prompt = `
       Genera mínimo 5 máximo 7 recetas de comida. Ten en cuenta los siguientes parámetros 
       para estas recetas:
       ${dietsearch}
       ${caloricExpenditureMessage}
       3. Objetivo: ${objective}
       ${allergiesMessage}
       ${intoleranceMessage}
       ${conditionsMessage}
       8. Presupuesto total para todas las recetas (presupuesto total semanal): ${budget}
       Lo más importante es que las recetas se basen en la dieta, alergias e intolerancias proporcionadas.
       Instrucciones adicionales:
       los pasos a seguir para cocinar que sean lo más concisos posible
       - No incluyas ingredientes comunes de cocina como sal y aceite en la lista de ingredientes.
       - Proporciona las cantidades necesarias en gramos o unidades dependiendo del ingrediente para cocinar dos porciones de cada receta.
       `;

    console.log("Prompt generated:", prompt);

    // Call the generateObject function
    const response = await generateObject({
      model: google("models/gemini-1.5-flash-latest"),
      temperature: 0.75,
      schema,
      prompt,
    });

    console.log("API response:", response); // Log the API response

    if (!response || !response.object || !response.object.recipes) {
      return NextResponse.json(
        { error: "Invalid API response structure" },
        { status: 500 }
      );
    }

    return NextResponse.json(response.object.recipes);
  } catch (error) {
    console.error("Error occurred:", error); // Log the error
    return NextResponse.json(
      { error: `Failed to generate recipes: ${error}` },
      { status: 500 }
    );
  }
}
