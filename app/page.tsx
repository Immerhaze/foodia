"use client";
import React, { useState, useCallback } from "react";
import SideNav from "@/app/ui/dashboard/sidenav";
import { RecipesCards } from "@/app/ui/dashboard/recipeCard";
import useStore from "@/app/store";
import EmailForm from "@/app/ui/components/emailForm";
import PdfForm from "./ui/components/pdfForm";
import { PageSkeleton } from "./ui/components/pagesSkeleton";
import { FunctionalBtn } from "./ui/components/functionalBtn";

export default function Page() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [showRecipes, setShowRecipes] = useState(false);
  const [ShowForm, setShowForm] = useState(false);
  const store = useStore();

  // Dummy data for recipes
  const recipesarray = [
    {
      title: "Pollo al Limón con Arroz Integral",
      ingredients: [
        {
          name: "Pollo",
          quantity: "2 pechugas medianas",
          calories: 280,
          price: 1500,
        },
        {
          name: "Arroz integral",
          quantity: "1 taza",
          calories: 200,
          price: 500,
        },
        {
          name: "Limón",
          quantity: "1",
          calories: 20,
          price: 100,
        },
        {
          name: "Ajo",
          quantity: "2 dientes",
          calories: 5,
          price: 50,
        },
        {
          name: "Cebolla",
          quantity: "1/2",
          calories: 25,
          price: 100,
        },
        {
          name: "Perejil",
          quantity: "1 cucharada",
          calories: 5,
          price: 50,
        },
        {
          name: "Caldo de pollo",
          quantity: "1 taza",
          calories: 10,
          price: 100,
        },
      ],
      steps: [
        "Cortar las pechugas de pollo en cubos medianos.",
        "Marinar el pollo con jugo de limón, ajo picado, cebolla picada y perejil.",
        "Cocinar el arroz integral según las instrucciones del paquete.",
        "En una sartén, saltear el pollo marinado hasta que esté dorado.",
        "Agregar el caldo de pollo a la sartén y dejar hervir por unos minutos.",
        "Servir el pollo con arroz integral.",
      ],
      duration: "45 minutos",
    },
    {
      title: "Hamburguesas de Lentejas con Ensalada",
      ingredients: [
        {
          name: "Lentejas",
          quantity: "1 taza",
          calories: 230,
          price: 400,
        },
        {
          name: "Cebolla",
          quantity: "1/2",
          calories: 25,
          price: 100,
        },
        {
          name: "Ajo",
          quantity: "2 dientes",
          calories: 5,
          price: 50,
        },
        {
          name: "Pan rallado",
          quantity: "1/2 taza",
          calories: 150,
          price: 200,
        },
        {
          name: "Huevos",
          quantity: "1",
          calories: 70,
          price: 100,
        },
        {
          name: "Lechuga",
          quantity: "2 hojas",
          calories: 10,
          price: 100,
        },
        {
          name: "Tomate",
          quantity: "1",
          calories: 20,
          price: 100,
        },
        {
          name: "Pepino",
          quantity: "1/2",
          calories: 15,
          price: 100,
        },
        {
          name: "Vinagreta",
          quantity: "2 cucharadas",
          calories: 50,
          price: 100,
        },
      ],
      steps: [
        "Cocinar las lentejas según las instrucciones del paquete.",
        "En un procesador de alimentos, mezclar las lentejas cocidas, cebolla picada, ajo picado, pan rallado y un huevo.",
        "Formar hamburguesas con la mezcla de lentejas.",
        "Cocinar las hamburguesas en una sartén caliente hasta que estén doradas.",
        "Preparar una ensalada con lechuga, tomate, pepino y vinagreta.",
        "Servir las hamburguesas de lentejas con la ensalada.",
      ],
      duration: "30 minutos",
    },
    {
      title: "Pasta con Pesto de Espinacas",
      ingredients: [
        {
          name: "Pasta integral",
          quantity: "1 taza",
          calories: 200,
          price: 400,
        },
        {
          name: "Espinacas",
          quantity: "1 taza",
          calories: 40,
          price: 300,
        },
        {
          name: "Ajo",
          quantity: "2 dientes",
          calories: 5,
          price: 50,
        },
        {
          name: "Nueces",
          quantity: "1/2 taza",
          calories: 300,
          price: 500,
        },
        {
          name: "Parmesano",
          quantity: "1/4 taza",
          calories: 200,
          price: 300,
        },
        {
          name: "Aceite de oliva",
          quantity: "2 cucharadas",
          calories: 120,
          price: 100,
        },
      ],
      steps: [
        "Cocinar la pasta integral según las instrucciones del paquete.",
        "En un procesador de alimentos, mezclar las espinacas, ajo, nueces, parmesano y aceite de oliva.",
        "Mezclar el pesto de espinacas con la pasta cocida.",
        "Servir la pasta con pesto de espinacas.",
      ],
      duration: "25 minutos",
    },
    {
      title: "Tacos de Quinoa con Verduras",
      ingredients: [
        {
          name: "Quinoa",
          quantity: "1/2 taza",
          calories: 120,
          price: 300,
        },
        {
          name: "Pimiento rojo",
          quantity: "1",
          calories: 30,
          price: 200,
        },
        {
          name: "Cebolla",
          quantity: "1/2",
          calories: 25,
          price: 100,
        },
        {
          name: "Zanahoria",
          quantity: "1",
          calories: 40,
          price: 150,
        },
        {
          name: "Tortillas de maíz",
          quantity: "2",
          calories: 150,
          price: 200,
        },
        {
          name: "Salsa picante",
          quantity: "1 cucharada",
          calories: 10,
          price: 50,
        },
      ],
      steps: [
        "Cocinar la quinoa según las instrucciones del paquete.",
        "Cortar el pimiento rojo, la cebolla y la zanahoria en cubos pequeños.",
        "Saltear las verduras en una sartén caliente hasta que estén blandas.",
        "Mezclar la quinoa cocida con las verduras salteadas.",
        "Calentar las tortillas de maíz.",
        "Rellenar las tortillas con la mezcla de quinoa y verduras.",
        "Servir los tacos con salsa picante.",
      ],
      duration: "35 minutos",
    },
    {
      title: "Ensalada de Garbanzos con Quinoa",
      ingredients: [
        {
          name: "Garbanzos",
          quantity: "1 taza",
          calories: 260,
          price: 300,
        },
        {
          name: "Quinoa",
          quantity: "1/2 taza",
          calories: 120,
          price: 300,
        },
        {
          name: "Tomate",
          quantity: "1",
          calories: 20,
          price: 100,
        },
        {
          name: "Pepino",
          quantity: "1/2",
          calories: 15,
          price: 100,
        },
        {
          name: "Cebolla roja",
          quantity: "1/4",
          calories: 15,
          price: 100,
        },
        {
          name: "Perejil",
          quantity: "1 cucharada",
          calories: 5,
          price: 50,
        },
        {
          name: "Vinagreta de limón",
          quantity: "2 cucharadas",
          calories: 50,
          price: 100,
        },
      ],
      steps: [
        "Cocinar la quinoa según las instrucciones del paquete.",
        "En un tazón, mezclar los garbanzos, la quinoa cocida, tomate picado, pepino picado, cebolla roja picada y perejil picado.",
        "Añadir la vinagreta de limón a la ensalada.",
        "Servir la ensalada de garbanzos con quinoa.",
      ],
      duration: "20 minutos",
    },
    {
      title: "Sopa de Lentejas con Vegetales",
      ingredients: [
        {
          name: "Lentejas",
          quantity: "1 taza",
          calories: 230,
          price: 400,
        },
        {
          name: "Zanahoria",
          quantity: "1",
          calories: 40,
          price: 150,
        },
        {
          name: "Cebolla",
          quantity: "1/2",
          calories: 25,
          price: 100,
        },
        {
          name: "Ajo",
          quantity: "2 dientes",
          calories: 5,
          price: 50,
        },
        {
          name: "Caldo de verduras",
          quantity: "4 tazas",
          calories: 20,
          price: 200,
        },
        {
          name: "Tomate picado",
          quantity: "1 lata",
          calories: 40,
          price: 200,
        },
        {
          name: "Laurel",
          quantity: "1 hoja",
          calories: 1,
          price: 20,
        },
      ],
      steps: [
        "Lavar las lentejas y colocarlas en una olla con el caldo de verduras, la zanahoria picada, la cebolla picada, el ajo picado, el tomate picado y la hoja de laurel.",
        "Llevar a ebullición y luego bajar el fuego, cocinar a fuego lento durante 30 minutos, o hasta que las lentejas estén blandas.",
        "Servir caliente.",
      ],
      duration: "40 minutos",
    },
    {
      title: "Pollo con Salsa de Manzana y Mostaza",
      ingredients: [
        {
          name: "Pollo",
          quantity: "2 pechugas medianas",
          calories: 280,
          price: 1500,
        },
        {
          name: "Manzana",
          quantity: "1",
          calories: 80,
          price: 200,
        },
        {
          name: "Mostaza",
          quantity: "2 cucharadas",
          calories: 20,
          price: 100,
        },
        {
          name: "Vinagre de manzana",
          quantity: "1 cucharada",
          calories: 10,
          price: 50,
        },
        {
          name: "Miel",
          quantity: "1 cucharada",
          calories: 60,
          price: 100,
        },
        {
          name: "Cebolla",
          quantity: "1/2",
          calories: 25,
          price: 100,
        },
        {
          name: "Ajo",
          quantity: "2 dientes",
          calories: 5,
          price: 50,
        },
      ],
      steps: [
        "Cortar las pechugas de pollo en cubos medianos.",
        "Saltear el pollo en una sartén caliente hasta que esté dorado.",
        "En un procesador de alimentos, mezclar la manzana picada, la mostaza, el vinagre de manzana, la miel, la cebolla picada y el ajo picado.",
        "Agregar la salsa de manzana y mostaza al pollo y cocinar a fuego lento durante 5 minutos.",
        "Servir caliente.",
      ],
      duration: "30 minutos",
    },
  ];

  // Handler for when recipes are generated and ready to show
  const handleRecipesGenerated = useCallback((newRecipes: any[]) => {
    setRecipes(newRecipes);
    setShowRecipes(true); // Show recipes when they are generated
  }, []);

  function handleFormMobileToggle(state: boolean) {
    setShowForm(!state);
  }

  function handleMobileBackToForm() {
    store.setMobileConsult(false);
  }

  return (
    <div className="flex flex-col h-screen bg-dashboard_light md:flex-row md:overflow-hidden p-2">
      <div
        className={`w-full  md:w-1/3 lg:w-96 p-2 ${
          ShowForm ? "block" : "hidden md:block"
        }`}
      >
        <SideNav
          onRecipesGenerated={handleRecipesGenerated}
          showform={setShowForm}
        />
      </div>
      <div
        className={`h-full md:w-2/3 lg:w-calc-100-minus-384px md:flex md:flex-col md:justify-center ${
          ShowForm ? "hidden md:block" : "block"
        }`}
      >
        {!ShowForm && store.apiRunning ? (
          <div className="w-full h-full">
            <PageSkeleton />
          </div>
        ) : !ShowForm && !store.apiRunning && recipes.length > 0 ? (
          <>
            <div className="w-full h-10 md:hidden text-secondary text-center flex justify-center items-center text-primary_text_light font-normal text-3xl">
              <h1>
                MEALT
                <span className="text-semantic_green_light font-extrabold">
                  AI
                </span>
                M
              </h1>
            </div>
            <div
              style={{ height: "calc(100% - 40px)" }}
              className="flex flex-col items-center "
            >
              <div className="h-16 w-full flex justify-center items-center">
                <span className="text-2xl rounded-lg w-2/3 text-white bg-semantic_green_light font font-semibold tracking-wider flex flex-row justify-center items-center py-2">
                  <h2>RECETAS</h2>
                </span>
              </div>
              <RecipesCards recipes={recipes} />
              <div className="w-screen h-1/3 md:hidden flex flex-col items-center justify-between">
                <EmailForm recipeslist={recipes} />
                <PdfForm recipes={recipes} />
                <FunctionalBtn
                  fn={() => handleMobileBackToForm()}
                  text="Repetir"
                  classNameIcon="icon-[icon-park-twotone--back] text-white"
                  classNameBtn="font-semibold bg-chart_emerald_light text-white"
                />
              </div>
              <div className="hidden w-full md:h-2/6 md:flex flex-col justify-center items-center">
                <EmailForm recipeslist={recipes} />
                <PdfForm recipes={recipes} />
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full py-2 ">
            <div className="w-full h-20 md:hidden text-secondary text-center flex justify-center items-center text-primary_text_light font-normal text-4xl">
              <h1>
                MEALT
                <span className="text-semantic_green_light font-extrabold">
                  AI
                </span>
                M
              </h1>
            </div>
            <div className="relative w-full h-2/6 bg-custom-background bg-center bg-cover  border-b-[2px] border-r-[2px] border-semantic_green_light overflow-hidden rounded-xl mb-2">
              <span className="absolute left-0 top-0 w-full h-full bg-accent_color_light/90" />
              <div className="absolute w-full h-full flex flex-col gap-3 justify-evenly md:justify-center px-5">
                <h1 className="font-semibold text-3xl md:text-4xl lg:text-5xl text-white">
                  Deja atrás el aburrimiento culinario.
                </h1>
                <h3 className="font-normal text-xl md:text-2xl lg:text-3xl text-white">
                  Descubre recetas hechas para ti.
                </h3>
                <FunctionalBtn
                  fn={() => handleFormMobileToggle(ShowForm)}
                  text=" Ir a formulario"
                  classNameIcon="icon-[lets-icons--form-duotone-line] text-black"
                  classNameBtn="font-semibold md:hidden"
                />
              </div>
            </div>
            <div className="rounded-xl p-3 flex flex-col gap-2 bg-white border-[1px] shadow-sm">
              <div>
                <h2 className="text-xl md:text-2xl text-accent_color_light font-semibold tracking-wide">
                  MODO DE USO
                </h2>

                <div className="text-left text-base md:text-lg tracking-wide flex flex-col gap-2">
                  <p>
                    <span className="hidden md:block">
                      A tu izquierda encontraras el formulario de consulta.
                    </span>{" "}
                    Los únicos campos obligatorios son los que tienen un
                    asterisco en el título{" "}
                    <strong>(objetivo, tipo de cuerpo, dieta)</strong>.
                  </p>
                  <p>
                    Todos los otros campos adicionales ayudaran a crear tu
                    recetario de almuerzos de una manera más precisa.
                  </p>
                  <p>
                    Especialmente los primeros 5 campos deberían ser completados
                    en conjunto, para calcular exitosamente un aproximado de tu
                    gasto calórico diario.
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl text-accent_color_light font-semibold tracking-wide">
                  PASOS
                </h2>
                <div className="text-base md:text-lg">
                  <ul className="flex flex-col gap-2">
                    <li>
                      <span className="text-semantic_green_light font-bold md:text-xl mr-2">
                        1.
                      </span>
                      Rellena el formulario, completa o parcialmente - según las
                      instrucciones.
                    </li>
                    <li>
                      <span className="text-semantic_green_light font-bold md:text-xl mr-2">
                        2.
                      </span>
                      Listo, Obtén tus recetas.
                    </li>
                    <li>
                      <span className="text-semantic_green_light font-bold md:text-xl mr-2">
                        3.
                      </span>
                      Descarga un PDF con tu recetario.
                    </li>
                    <li>
                      <span className="text-semantic_green_light font-bold md:text-xl mr-2">
                        4.
                      </span>
                      Envía tu recetario a un E-mail de tu preferencia.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
