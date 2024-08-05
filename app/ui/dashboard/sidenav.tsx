"use client";
import React, { useState } from "react";
import { InputSection } from "@/app/ui/components/input-buttons";
import useStore from "@/app/store";
import { GetDiario } from "@/lib/utils";
import { FunctionalBtn } from "../components/functionalBtn";

interface SideNavProps {
  onRecipesGenerated: (recipes: any[]) => void;
  showform: (state: boolean) => void;
}

export default function SideNav({
  onRecipesGenerated,
  showform,
}: SideNavProps) {
  const sections = [
    {
      title: "genre",
      subtitle: null,
      arr: [
        {
          title: "Hombre",
          icon: "icon-[streamline--man-symbol]",
        },
        {
          title: "Mujer",
          icon: "icon-[ant-design--woman-outlined]",
        },
      ],
    },
    {
      title: "weight",
      subtitle: null,
      arr: [
        {
          title: "none",
          icon: "icon-[game-icons--weight-scale]",
        },
      ],
    },
    {
      title: "height",
      subtitle: null,
      arr: [
        {
          title: "none",
          icon: "icon-[tabler--ruler-measure-2]",
        },
      ],
    },
    {
      title: "age",
      subtitle: null,
      arr: [
        {
          title: "none",
          icon: "icon-[uis--schedule]",
        },
      ],
    },
    {
      title: "activity",
      subtitle: null,
      arr: [
        {
          title: "Sedentario",
          subtext: null,
          tooltip: "Poco o nada de ejercicio.",
        },
        {
          title: "Baja",
          subtext: null,
          tooltip: "1 a 3 días en la semana",
        },
        {
          title: "Moderada",
          subtext: null,
          tooltip: "3 a 5 días en la semana",
        },
        {
          title: "Intensa",
          subtext: null,
          tooltip: "6 a 7 días en la semana",
        },
      ],
    },

    {
      title: "objective",
      subtitle: null,
      arr: [
        {
          title: "Subir",
          icon: "icon-[si-glyph--weight-up]",
        },
        {
          title: "bajar",
          icon: "icon-[si-glyph--weight-down]",
        },
      ],
    },
    {
      title: "body",
      subtitle: null,
      arr: [
        {
          title: "Ectomorfo",
          icon: "icon-[ion--body]",
          tooltip: "Cuesta ganar peso y músculo.",
        },
        {
          title: "Endomorfo",
          icon: "icon-[ion--body]",
          tooltip: "Facilidad para ganar peso, metabolismo lento.",
        },
        {
          title: "Mesomorfo",
          icon: "icon-[ion--body]",
          tooltip: "Ganan músculo fácilmente y tienen un cuerpo tonificado.",
        },
      ],
    },
    {
      title: "diet",
      subtitle: null,
      arr: [
        {
          title: "Omnivora",
          icon: "icon-[dashicons--food]",
          tooltip:
            "Omnívoro: Come tanto alimentos de origen animal como vegetal.",
        },
        {
          title: "Lactoveg",
          icon: "icon-[icon-park-solid--milk-one]",
          tooltip:
            "Lactovegetariano: Come vegetales y productos lácteos, pero no huevos ni carne.",
        },
        {
          title: "Ovoveg",
          icon: "icon-[bi--egg-fried]",
          tooltip:
            "Ovovegetariano: Come vegetales y huevos, pero no lácteos ni carne.:",
        },
        {
          title: "Lactoovoveg",
          icon: "icon-[file-icons--cake]",
          tooltip:
            "Lacto-ovo-vegetariano: Come vegetales, lácteos y huevos, pero no carne.",
        },
        {
          title: "Pescetariana",
          icon: "icon-[ion--fish]",
          tooltip:
            "Pescetariano: Come vegetales y pescado, pero no otras carnes.",
        },
        {
          title: "Vegana",
          icon: "icon-[fluent--bowl-salad-24-filled]",
          tooltip:
            "Vegano: Solo come alimentos de origen vegetal, sin productos animales ni derivados.",
        },
      ],
    },
    {
      title: "allergies",
      subtitle: null,
      arr: [
        {
          title: "Mani",
          icon: "icon-[mdi--peanut]",
        },
        {
          title: "Frutos secos",
          icon: "icon-[icon-park-solid--nut]",
        },
        {
          title: "Leche",
          icon: "icon-[icon-park-solid--milk-one]",
        },
        {
          title: "Huevos",
          icon: "icon-[bi--egg-fried]",
        },
        {
          title: "Mariscos",
          icon: "icon-[ph--shrimp-fill]",
        },
        {
          title: "Pescado",
          icon: "icon-[ion--fish]",
        },
        {
          title: "Soya",
          icon: "icon-[mdi--soy-sauce]",
        },
        {
          title: "Trigo",
          icon: "icon-[fa6-solid--wheat-awn]",
        },
      ],
    },
    {
      title: "intolerance",
      subtitle: null,
      arr: [
        {
          title: "Lactosa",
          icon: "icon-[icon-park-solid--cheese]",
          tooltip:
            "Dificultad para digerir el azúcar presente en la leche y productos lácteos.",
        },
        {
          title: "Gluten",
          icon: "icon-[healthicons--gluten]",
          tooltip:
            "Reacción adversa al gluten, una proteína en el trigo, la cebada y el centeno.",
        },
        {
          title: "Fructosa",
          icon: "icon-[mdi--fruit-watermelon]",
          tooltip:
            "Dificultad para absorber la fructosa, un azúcar presente en frutas, miel y algunos vegetales.",
        },
        {
          title: "Histamina",
          icon: "icon-[file-icons--precision]",
          tooltip:
            "Reacción adversa a la histamina, una sustancia presente en alimentos fermentados y procesados.",
        },
      ],
    },
    {
      title: "condition",
      subtitle: null,
      arr: [
        {
          title: "Diabetes",
          icon: "icon-[mdi--diabetes]",
          tooltip: "Afecta la regulación del azúcar en la sangre",
        },
        {
          title: "Enf. cardiovascular",
          icon: "icon-[material-symbols--cardio-load]",
          tooltip: "Trastornos que afectan el corazón y los vasos sanguíneo",
        },
        {
          title: "Enf. renal",
          icon: "icon-[material-symbols--nephrology]",
          tooltip:
            "Afección que daña los riñones y afecta su capacidad para filtrar desechos de la sangre.",
        },
        {
          title: "Hipertensión",
          icon: "icon-[icon-park-solid--electrocardiogram]",
          tooltip:
            "Presión arterial alta que aumenta el riesgo de enfermedades cardíacas y accidentes cerebrovasculares.",
        },
        {
          title: "Intestino irritable",
          icon: "icon-[healthicons--intestine]",
          tooltip:
            "Trastorno digestivo que causa dolor abdominal, hinchazón y cambios en los hábitos intestinales.",
        },
      ],
    },
  ];

  const store = useStore();
  const [error, setError] = useState<string | null>(null);

  async function generateRecipes(data: {
    body: string;
    objective: string;
    diet: string;
    allergies?: string[];
    intolerance?: string[];
    conditions?: string[];
    budget: number;
    kca: number | string;
  }) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GENERATE_URL}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const recipes = await response.json();
    return recipes;
  }

  async function checkStore() {
    store.setapiRunning(true);
    const {
      genre,
      weight,
      height,
      age,
      body,
      diet,
      objective,
      allergies,
      intolerance,
      condition,
      budget,
    } = store;

    // Ensure genre is a valid string, fallback to "unknown" if null or undefined
    const safeGenre: string = genre ?? "unknown";

    // Log the state values for debugging
    console.log("Current store values:", {
      genre: safeGenre,
      weight,
      height,
      age,
      body,
      diet,
      objective,
      allergies,
      intolerance,
      condition,
      budget,
    });

    // Call GetDiario with the correct arguments
    if (safeGenre == null || weight == null || height == null || age == null) {
      console.error("Missing required parameters for GetDiario");
      // Optionally handle this case if needed, e.g., set a default or show a warning
    }

    const diario = GetDiario(safeGenre, weight, height, age);
    console.log("Calculated diario value:", diario);

    if (!body || !diet || !objective) {
      console.error("Missing required fields for recipe generation:", {
        body,
        diet,
        objective,
      });
      store.setapiRunning(false);
      setError("Please complete all required sections.");
      return;
    }

    try {
      console.log("Calling generateRecipes with parameters:", {
        body,
        objective,
        diet,
        allergies,
        intolerance,
        condition,
        budget,
        kca: diario,
      });

      const response = await generateRecipes({
        body,
        objective,
        diet,
        allergies,
        intolerance,
        conditions: condition,
        budget,
        kca: diario,
      });

      console.log("Recipe generation response:", response);

      store.setapiRunning(false);
      store.setMobileConsult(true);
      onRecipesGenerated(response);
    } catch (error) {
      console.error("Error generating recipes:", error);
      store.setapiRunning(false);
      setError("Failed to generate recipes.");
    }
  }

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-widget_light rounded-2xl shadow-xl">
      <span className="hidden border-b-[1px] border-primary_text_light/30 shadow-md shadow-semantic_green_light/30 mb-2 md:flex h-20 justify-center items-center rounded-md p-4 ">
        <div className="w-full text-secondary text-center text-primary_text_light font-normal text-4xl ">
          <h1>
            MEALT
            <span className="text-semantic_green_light font-extrabold">AI</span>
            M
          </h1>
        </div>
      </span>
      <FunctionalBtn
        fn={() => showform(false)}
        text="Inicio"
        classNameIcon="icon-[icon-park-twotone--back] text-semantic_green_light"
        classNameBtn="w-full text-xl font-semibold px-1 md:hidden"
      />
      <div className=" overflow-y-scroll overflow-x-hidden input-scrollbar flex grow flex-col py-2 justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <InputSection arr={sections} />
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission behavior
            if (window.innerWidth <= 768) {
              // Check if the device is mobile
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
            showform(false);
            checkStore();
          }}
          className="w-full flex flex-col justify-center items-center"
        >
          <button
            type="submit" // Change type to submit
            disabled={store.apiRunning}
            className="h-[48px] w-[80%] border-2 border-accent_color_light text-accent_color_light flex flex-row justify-center items-center"
          >
            {store.apiRunning ? (
              //
              <span>CARGANDO</span>
            ) : (
              <>
                <span className="flex flex-row justify-center items-center text-lg gap-4">
                  CONSULTAR
                  <span className="icon-[material-symbols--send] text-semantic_green_light "></span>
                </span>
              </>
            )}
          </button>
          {error && (
            <p className="text-red-600 text-xs font-semibold px-2  py-2 text-center">
              {error}
            </p>
          )}
        </form>
      </div>
      <div className="border-t-[1px]  border-primary_text_light/30 rounded-2xl h-10 pt-4 flex justify-center items-end text-xs text-primary_text_light font-light">
        <p className=" flex flex-row text-base gap-2">
          Diseñado por
          <span className="text-semantic_green_light font-semibold underline">
            Nicode
          </span>
        </p>
      </div>
    </div>
  );
}
