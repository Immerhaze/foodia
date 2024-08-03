import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function GetDiario(
  genero: string | null | undefined,
  peso: number | null | undefined,
  altura: number | null | undefined,
  edad: number | null | undefined
) {
  // Check if any of the required values are null or undefined
  if (
    genero === null ||
    genero === undefined ||
    genero === undefined ||
    peso === null ||
    peso === undefined ||
    altura === null ||
    altura === undefined ||
    edad === null ||
    edad === undefined
  ) {
    return "Calculation wasn't made due to lack of information";
  }

  // Convert values to numbers if they are not already
  const safePeso = Number(peso);
  const safeAltura = Number(altura);
  const safeEdad = Number(edad);

  const hombre = 66 + 13.7 * safePeso + 5 * safeAltura - 6.8 * safeEdad * 1;
  const mujer = 655 + 9.6 * safePeso + 1.8 * safeAltura - 4.7 * safeEdad * 1;

  // Calculate based on genero
  if (genero == "Hombre") {
    return hombre;
  } else if (genero == "Mujer") {
    return mujer;
  } else {
    return "Invalid gender";
  }
}

// types.ts
export interface Ingredient {
  name: string;
  quantity: string;
  calories: number;
}

export const sumKca = (ingredients: Ingredient[]): number => {
  return ingredients.reduce(
    (total, ingredient) => total + ingredient.calories,
    0
  );
};

type Recipe = {
  title: string;
  ingredients: Ingredient[];
  steps: string[];
  duration: string;
};

interface emailprops {
  recipes: Recipe[];
}

export const ingredientList = ({ recipes }: emailprops) => {
  let allIngredients: string[] = [];
  let uniqueIngredients: string[] = [];
  let processed: Set<string> = new Set();

  // Function to normalize ingredient names
  const normalizeName = (name: string) => {
    return name.toLowerCase().trim();
  };

  // Function to find partial matches
  const findMatch = (name: string, list: string[]) => {
    for (const item of list) {
      if (item.includes(name) || name.includes(item)) {
        return item;
      }
    }
    return null;
  };

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const normalizedName = normalizeName(ingredient.name);

      if (!processed.has(normalizedName)) {
        // Find if there's a similar ingredient already in the list
        const match = findMatch(normalizedName, uniqueIngredients);
        if (match) {
          // If match is found, use the existing ingredient's name
          processed.add(normalizedName);
        } else {
          // No match found, add as new unique ingredient
          uniqueIngredients.push(normalizedName);
          processed.add(normalizedName);
        }
      }
    });
  });

  // Optionally, return or log uniqueIngredients
  return uniqueIngredients;
};
