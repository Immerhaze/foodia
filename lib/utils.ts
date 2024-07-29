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
