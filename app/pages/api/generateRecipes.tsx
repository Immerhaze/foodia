import google from "@/lib/googleProvider";
import { generateObject } from "ai";
import { z } from "zod";

interface GenerateRecipesOptions {
  body: string;
  objective: string;
  diet: string;
  allergies?: string[] | undefined | null;
  intolerance?: string[] | undefined | null;
  conditions?: string[] | undefined | null;
  budget: number;
  kca: number | string;
}

export const generateRecipes = async ({
  body,
  objective,
  diet,
  allergies,
  intolerance,
  conditions,
  budget,
  kca,
}: GenerateRecipesOptions) => {
  // Construct the caloric expenditure message only if kca is a number
  const caloricExpenditureMessage =
    typeof kca === "number"
      ? `1. El gasto calórico de esta persona es de ${
          objective == "bajar" ? kca - 500 : kca + 500
        } kcal.`
      : "";

  const AllergiesMessage =
    allergies && allergies.length > 0
      ? `5. Alergias: ${allergies.join(", ")}`
      : "";

  const IntoleranceMessage =
    intolerance && intolerance.length > 0
      ? `6. Intolerancias: ${intolerance.join(", ")}`
      : "";

  const ConditionsMessage =
    conditions && conditions.length > 0
      ? `7. Condiciones médicas: ${conditions.join(", ")}`
      : "";

  const prompt = `
  Genera 7 recetas de almuerzos diferentes. Ten en cuenta los siguientes parámetros para estas recetas:
  
  ${caloricExpenditureMessage}
  2. Tipo de cuerpo: ${body}
  3. Objetivo: ${objective}
  4. Dieta: ${diet}
  ${AllergiesMessage}
  ${IntoleranceMessage}
  ${ConditionsMessage}
  8. Presupuesto total para todas las recetas (presupuesto total semanal): ${budget}
  
  Instrucciones adicionales:
  - No incluyas ingredientes de cocina comunes como sal y aceite en la lista de ingredientes.
  - Proporciona las cantidades necesarias en gramos o unidades dependiendo del ingrediente para cocinar dos porciones de cada receta.`;

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

  try {
    const response = await generateObject({
      model: google("models/gemini-1.5-flash-latest"),
      temperature: 0.75,
      schema,
      prompt,
    });

    if (!response || !response.object || !response.object.recipes) {
      console.error("Invalid API response structure:", response);
      throw new Error("Invalid API response structure");
    }

    console.log("Generated object:", response.object);
    return response.object.recipes;
  } catch (error) {
    console.error("Error details:", error);
    throw new Error(`Failed to generate recipes: ${error}`);
  }
};
