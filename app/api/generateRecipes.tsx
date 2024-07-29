import google from "@/lib/googleProvider";
import { generateObject } from "ai";
import { z } from "zod";

interface GenerateRecipesOptions {
  body: string;
  objective: string;
  diet: string;
  allergies?: string[];
  intolerance?: string[];
  conditions?: string[];
  budget: number;
  country: string;
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
  country,
  kca,
}: GenerateRecipesOptions) => {
  // Construct the caloric expenditure message only if kca is a number
  const caloricExpenditureMessage =
    typeof kca === "number"
      ? `1. El gasto calórico de esta persona es de ${kca} kcal.`
      : "";

  const prompt = `
  Genera  entre 5 y 7 recetas comida diferente. Ten en cuenta los siguientes parámetros para estas recetas:
  
  ${caloricExpenditureMessage}
  2. Tipo de cuerpo: ${body}
  3. Objetivo de peso: ${objective}
  4. Dieta: ${diet}
  5. Alergias: ${allergies?.join(", ")}
  6. Intolerancias: ${intolerance?.join(", ")}
  7. Condiciones médicas: ${conditions?.join(", ")}
  8. Presupuesto total para todas las recetas (presupuesto total semanal): ${budget}
  9. País de consulta de recetas: ${country}
  
  Instrucciones adicionales:
  - No incluyas ingredientes de cocina comunes como sal y aceite en la lista de ingredientes.
  - Proporciona las cantidades necesarias para hacer dos porciones de cada receta.
  - Asegúrate de que los ingredientes estén listados con la cantidad necesaria para la receta, pero considera que muchos ingredientes no se pueden comprar en pequeñas cantidades específicas (por ejemplo, no indicar 50 pesos de aceite, sino una botella de aceite y especificar que se usan 5 ml).
  - Presenta las recetas en un formato JSON que contenga:
    - El título de cada receta
    - Los ingredientes con sus respectivas cantidades, conteo de calorías.
    - Los pasos de preparación
    - La duración total de la preparación`;

  const schema = z.object({
    recipes: z.array(
      z.object({
        title: z.string(),
        ingredients: z.array(
          z.object({
            name: z.string(),
            quantity: z.string(),
            calories: z.number(),
            price: z.number(),
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
