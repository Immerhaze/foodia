import { EmailTemplate } from "@/emails/email-template";
import { Resend } from "resend";
import * as React from "react";
import { ingredientList } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request, res: Response) {
  console.log("starting to send email");
  const { formdata, recipes } = await request.json();
  // const dataprop = {
  //   username: "nicolas",
  //   email: "nico.rc2@outlook.com",
  // };
  // const recipesarray = [
  //   {
  //     title: "Pollo al Limón con Arroz Integral",
  //     ingredients: [
  //       {
  //         name: "Pollo",
  //         quantity: "2 pechugas medianas",
  //         calories: 280,
  //         price: 1500,
  //       },
  //       {
  //         name: "Arroz integral",
  //         quantity: "1 taza",
  //         calories: 200,
  //         price: 500,
  //       },
  //       {
  //         name: "Limón",
  //         quantity: "1",
  //         calories: 20,
  //         price: 100,
  //       },
  //       {
  //         name: "Ajo",
  //         quantity: "2 dientes",
  //         calories: 5,
  //         price: 50,
  //       },
  //       {
  //         name: "Cebolla",
  //         quantity: "1/2",
  //         calories: 25,
  //         price: 100,
  //       },
  //       {
  //         name: "Perejil",
  //         quantity: "1 cucharada",
  //         calories: 5,
  //         price: 50,
  //       },
  //       {
  //         name: "Caldo de pollo",
  //         quantity: "1 taza",
  //         calories: 10,
  //         price: 100,
  //       },
  //     ],
  //     steps: [
  //       "Cortar las pechugas de pollo en cubos medianos.",
  //       "Marinar el pollo con jugo de limón, ajo picado, cebolla picada y perejil.",
  //       "Cocinar el arroz integral según las instrucciones del paquete.",
  //       "En una sartén, saltear el pollo marinado hasta que esté dorado.",
  //       "Agregar el caldo de pollo a la sartén y dejar hervir por unos minutos.",
  //       "Servir el pollo con arroz integral.",
  //     ],
  //     duration: "45 minutos",
  //   },
  //   {
  //     title: "Hamburguesas de Lentejas con Ensalada",
  //     ingredients: [
  //       {
  //         name: "Lentejas",
  //         quantity: "1 taza",
  //         calories: 230,
  //         price: 400,
  //       },
  //       {
  //         name: "Cebolla",
  //         quantity: "1/2",
  //         calories: 25,
  //         price: 100,
  //       },
  //       {
  //         name: "Ajo",
  //         quantity: "2 dientes",
  //         calories: 5,
  //         price: 50,
  //       },
  //       {
  //         name: "Pan rallado",
  //         quantity: "1/2 taza",
  //         calories: 150,
  //         price: 200,
  //       },
  //       {
  //         name: "Huevos",
  //         quantity: "1",
  //         calories: 70,
  //         price: 100,
  //       },
  //       {
  //         name: "Lechuga",
  //         quantity: "2 hojas",
  //         calories: 10,
  //         price: 100,
  //       },
  //       {
  //         name: "Tomate",
  //         quantity: "1",
  //         calories: 20,
  //         price: 100,
  //       },
  //       {
  //         name: "Pepino",
  //         quantity: "1/2",
  //         calories: 15,
  //         price: 100,
  //       },
  //       {
  //         name: "Vinagreta",
  //         quantity: "2 cucharadas",
  //         calories: 50,
  //         price: 100,
  //       },
  //     ],
  //     steps: [
  //       "Cocinar las lentejas según las instrucciones del paquete.",
  //       "En un procesador de alimentos, mezclar las lentejas cocidas, cebolla picada, ajo picado, pan rallado y un huevo.",
  //       "Formar hamburguesas con la mezcla de lentejas.",
  //       "Cocinar las hamburguesas en una sartén caliente hasta que estén doradas.",
  //       "Preparar una ensalada con lechuga, tomate, pepino y vinagreta.",
  //       "Servir las hamburguesas de lentejas con la ensalada.",
  //     ],
  //     duration: "30 minutos",
  //   },
  //   {
  //     title: "Pasta con Pesto de Espinacas",
  //     ingredients: [
  //       {
  //         name: "Pasta integral",
  //         quantity: "1 taza",
  //         calories: 200,
  //         price: 400,
  //       },
  //       {
  //         name: "Espinacas",
  //         quantity: "1 taza",
  //         calories: 40,
  //         price: 300,
  //       },
  //       {
  //         name: "Ajo",
  //         quantity: "2 dientes",
  //         calories: 5,
  //         price: 50,
  //       },
  //       {
  //         name: "Nueces",
  //         quantity: "1/2 taza",
  //         calories: 300,
  //         price: 500,
  //       },
  //       {
  //         name: "Parmesano",
  //         quantity: "1/4 taza",
  //         calories: 200,
  //         price: 300,
  //       },
  //       {
  //         name: "Aceite de oliva",
  //         quantity: "2 cucharadas",
  //         calories: 120,
  //         price: 100,
  //       },
  //     ],
  //     steps: [
  //       "Cocinar la pasta integral según las instrucciones del paquete.",
  //       "En un procesador de alimentos, mezclar las espinacas, ajo, nueces, parmesano y aceite de oliva.",
  //       "Mezclar el pesto de espinacas con la pasta cocida.",
  //       "Servir la pasta con pesto de espinacas.",
  //     ],
  //     duration: "25 minutos",
  //   },
  //   {
  //     title: "Tacos de Quinoa con Verduras",
  //     ingredients: [
  //       {
  //         name: "Quinoa",
  //         quantity: "1/2 taza",
  //         calories: 120,
  //         price: 300,
  //       },
  //       {
  //         name: "Pimiento rojo",
  //         quantity: "1",
  //         calories: 30,
  //         price: 200,
  //       },
  //       {
  //         name: "Cebolla",
  //         quantity: "1/2",
  //         calories: 25,
  //         price: 100,
  //       },
  //       {
  //         name: "Zanahoria",
  //         quantity: "1",
  //         calories: 40,
  //         price: 150,
  //       },
  //       {
  //         name: "Tortillas de maíz",
  //         quantity: "2",
  //         calories: 150,
  //         price: 200,
  //       },
  //       {
  //         name: "Salsa picante",
  //         quantity: "1 cucharada",
  //         calories: 10,
  //         price: 50,
  //       },
  //     ],
  //     steps: [
  //       "Cocinar la quinoa según las instrucciones del paquete.",
  //       "Cortar el pimiento rojo, la cebolla y la zanahoria en cubos pequeños.",
  //       "Saltear las verduras en una sartén caliente hasta que estén blandas.",
  //       "Mezclar la quinoa cocida con las verduras salteadas.",
  //       "Calentar las tortillas de maíz.",
  //       "Rellenar las tortillas con la mezcla de quinoa y verduras.",
  //       "Servir los tacos con salsa picante.",
  //     ],
  //     duration: "35 minutos",
  //   },
  //   {
  //     title: "Ensalada de Garbanzos con Quinoa",
  //     ingredients: [
  //       {
  //         name: "Garbanzos",
  //         quantity: "1 taza",
  //         calories: 260,
  //         price: 300,
  //       },
  //       {
  //         name: "Quinoa",
  //         quantity: "1/2 taza",
  //         calories: 120,
  //         price: 300,
  //       },
  //       {
  //         name: "Tomate",
  //         quantity: "1",
  //         calories: 20,
  //         price: 100,
  //       },
  //       {
  //         name: "Pepino",
  //         quantity: "1/2",
  //         calories: 15,
  //         price: 100,
  //       },
  //       {
  //         name: "Cebolla roja",
  //         quantity: "1/4",
  //         calories: 15,
  //         price: 100,
  //       },
  //       {
  //         name: "Perejil",
  //         quantity: "1 cucharada",
  //         calories: 5,
  //         price: 50,
  //       },
  //       {
  //         name: "Vinagreta de limón",
  //         quantity: "2 cucharadas",
  //         calories: 50,
  //         price: 100,
  //       },
  //     ],
  //     steps: [
  //       "Cocinar la quinoa según las instrucciones del paquete.",
  //       "En un tazón, mezclar los garbanzos, la quinoa cocida, tomate picado, pepino picado, cebolla roja picada y perejil picado.",
  //       "Añadir la vinagreta de limón a la ensalada.",
  //       "Servir la ensalada de garbanzos con quinoa.",
  //     ],
  //     duration: "20 minutos",
  //   },
  //   {
  //     title: "Sopa de Lentejas con Vegetales",
  //     ingredients: [
  //       {
  //         name: "Lentejas",
  //         quantity: "1 taza",
  //         calories: 230,
  //         price: 400,
  //       },
  //       {
  //         name: "Zanahoria",
  //         quantity: "1",
  //         calories: 40,
  //         price: 150,
  //       },
  //       {
  //         name: "Cebolla",
  //         quantity: "1/2",
  //         calories: 25,
  //         price: 100,
  //       },
  //       {
  //         name: "Ajo",
  //         quantity: "2 dientes",
  //         calories: 5,
  //         price: 50,
  //       },
  //       {
  //         name: "Caldo de verduras",
  //         quantity: "4 tazas",
  //         calories: 20,
  //         price: 200,
  //       },
  //       {
  //         name: "Tomate picado",
  //         quantity: "1 lata",
  //         calories: 40,
  //         price: 200,
  //       },
  //       {
  //         name: "Laurel",
  //         quantity: "1 hoja",
  //         calories: 1,
  //         price: 20,
  //       },
  //     ],
  //     steps: [
  //       "Lavar las lentejas y colocarlas en una olla con el caldo de verduras, la zanahoria picada, la cebolla picada, el ajo picado, el tomate picado y la hoja de laurel.",
  //       "Llevar a ebullición y luego bajar el fuego, cocinar a fuego lento durante 30 minutos, o hasta que las lentejas estén blandas.",
  //       "Servir caliente.",
  //     ],
  //     duration: "40 minutos",
  //   },
  //   {
  //     title: "Pollo con Salsa de Manzana y Mostaza",
  //     ingredients: [
  //       {
  //         name: "Pollo",
  //         quantity: "2 pechugas medianas",
  //         calories: 280,
  //         price: 1500,
  //       },
  //       {
  //         name: "Manzana",
  //         quantity: "1",
  //         calories: 80,
  //         price: 200,
  //       },
  //       {
  //         name: "Mostaza",
  //         quantity: "2 cucharadas",
  //         calories: 20,
  //         price: 100,
  //       },
  //       {
  //         name: "Vinagre de manzana",
  //         quantity: "1 cucharada",
  //         calories: 10,
  //         price: 50,
  //       },
  //       {
  //         name: "Miel",
  //         quantity: "1 cucharada",
  //         calories: 60,
  //         price: 100,
  //       },
  //       {
  //         name: "Cebolla",
  //         quantity: "1/2",
  //         calories: 25,
  //         price: 100,
  //       },
  //       {
  //         name: "Ajo",
  //         quantity: "2 dientes",
  //         calories: 5,
  //         price: 50,
  //       },
  //     ],
  //     steps: [
  //       "Cortar las pechugas de pollo en cubos medianos.",
  //       "Saltear el pollo en una sartén caliente hasta que esté dorado.",
  //       "En un procesador de alimentos, mezclar la manzana picada, la mostaza, el vinagre de manzana, la miel, la cebolla picada y el ajo picado.",
  //       "Agregar la salsa de manzana y mostaza al pollo y cocinar a fuego lento durante 5 minutos.",
  //       "Servir caliente.",
  //     ],
  //     duration: "30 minutos",
  //   },
  // ];
  const categorizedIngredients = ingredientList({ recipes: recipes });
  console.log(process.env.RESEND_API_KEY);
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { data, error } = await resend.emails.send({
      from: "Mealtaim <onboarding@resend.dev>",
      to: [`${formdata.email}`],
      subject: "Recetas creadas para ti!",
      // react: render(EmailTemplate() as React.ReactElement),
      react: EmailTemplate({
        formdata: formdata,
        recipes: recipes,
        list: categorizedIngredients,
      }) as React.ReactElement,
      // html: "<h1>hola ahora </h1>",
    });

    if (error) {
      return NextResponse.json({ success: false, error: error });
    }

    return NextResponse.json({ success: true, response: data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
