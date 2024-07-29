"use client";
import React, { useState, useCallback } from "react";
import Link from "next/link";
import SideNav from "@/app/ui/dashboard/sidenav";
import { RecipesCards } from "@/app/ui/dashboard/recipeCard";
import { Button } from "@/app/ui/button";
import useStore from "@/app/store";
import EmailForm from "@/app/ui/components/emailForm";

export default function Page() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [showRecipes, setShowRecipes] = useState(false);
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

  function handleMobileBackToForm() {
    store.setMobileConsult(false);
  }

  return (
    <div className="flex flex-col h-screen bg-dashboard_light md:flex-row md:overflow-hidden">
      <div
        className={`w-full flex-none md:w-1/3 lg:w-96 p-2 ${
          store.mobileConsult ? "hidden md:block" : "block"
        }`}
      >
        <SideNav onRecipesGenerated={handleRecipesGenerated} />
      </div>
      <div
        className={`h-full md:w-2/3  py-3 ${
          store.mobileConsult ? "block" : "hidden md:block"
        }`}
      >
        <div className="md:hidden w-full h-20 flex flex-row justify-center items-center  text-center text-primary_text_light font-normal text-5xl ">
          <h1>FOOD</h1>
          <span className="text-semantic_green_light font-extrabold">IA</span>
        </div>
        <div className="flex flex-col items-center justify-evenly px-2 md:h-5/6 ">
          <div className="h-20 w-full flex  justify-center items-center">
            <span className="text-2xl  rounded-lg w-2/3 text-white bg-semantic_green_light font font-semibold tracking tracking-wider  flex flex-row justify-center items-center py-2">
              <span className="icon-[solar--chef-hat-heart-bold]"></span>
              <h2>RECETAS</h2>
            </span>
          </div>
          <RecipesCards recipes={recipesarray} />
          <div className="h-36 md:hidden w-full flex flex-col justify-center items-center">
            <EmailForm recipes={recipesarray} />
            <Button
              onClick={handleMobileBackToForm}
              className="bg-widget_light mt-3  lg:hover:bg-accent_color_light text-primary_text_light lg:hover:text-white border-primary_text_light "
            >
              <span className="font-normal tracking-wide  w-full text-xl ">
                <span className="icon-[lets-icons--back] text-xl mr-2"></span>
                Repetir
              </span>
            </Button>
          </div>
        </div>
        <div className="hidden md:h-1/6 md:flex justify-center items-center">
          <EmailForm recipes={recipesarray} />
        </div>
      </div>
    </div>
  );
}
