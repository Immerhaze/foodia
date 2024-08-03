"use client";
import React, { useState } from "react";
import { InputSection } from "@/app/ui/components/input-buttons";
import useStore from "@/app/store";
import { generateRecipes } from "@/app/api/generateRecipes";
import { GetDiario } from "@/lib/utils";

interface SideNavProps {
  onRecipesGenerated: (recipes: any[]) => void;
}

export default function SideNav({ onRecipesGenerated }: SideNavProps) {
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
          title: "Ninguna",
          subtext: null,
        },
        {
          title: "Baja",
          subtext: null,
        },
        {
          title: "Moderada",
          subtext: null,
        },
        {
          title: "Intensa",
          subtext: null,
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
        },
        {
          title: "Endomorfo",
          icon: "icon-[ion--body]",
        },
        {
          title: "Mesomorfo",
          icon: "icon-[ion--body]",
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
        },
        {
          title: "Lactoveg",
          icon: "icon-[icon-park-solid--milk-one]",
        },
        {
          title: "Ovoveg",
          icon: "icon-[bi--egg-fried]",
        },
        {
          title: "Lactoovoveg",
          icon: "icon-[file-icons--cake]",
        },
        {
          title: "Pescetariana",
          icon: "icon-[ion--fish]",
        },
        {
          title: "Vegana",
          icon: "icon-[fluent--bowl-salad-24-filled]",
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
        },
        {
          title: "Gluten",
          icon: "icon-[healthicons--gluten]",
        },
        {
          title: "Fructosa",
          icon: "icon-[mdi--fruit-watermelon]",
        },
        {
          title: "Histamina",
          icon: "icon-[file-icons--precision]",
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
        },
        {
          title: "Enfermedad cardiovascular",
          icon: "icon-[material-symbols--cardio-load]",
        },
        {
          title: "Enfermedad renal",
          icon: "icon-[material-symbols--nephrology]",
        },
        {
          title: "Hipertensión",
          icon: "icon-[icon-park-solid--electrocardiogram]",
        },
        {
          title: "Intestino irritable",
          icon: "icon-[healthicons--intestine]",
        },
      ],
    },
  ];

  const store = useStore();
  const [error, setError] = useState<string | null>(null);

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

    // Call GetDiario with the correct arguments
    const diario = await GetDiario(safeGenre, weight, height, age);

    if (!body || !diet || !objective) {
      setError("Please complete all required sections.");
      return;
    }
    try {
      const recipes = await generateRecipes({
        body: body,
        objective: objective,
        diet: diet,
        allergies: allergies,
        intolerance: intolerance,
        conditions: condition,
        budget: budget,
        country: "Chile",
        kca: diario,
      });
      console.log(store);
      store.setapiRunning(false);
      store.setMobileConsult(true);
      onRecipesGenerated(recipes); // Pass the recipes to the parent
    } catch (e) {
      store.setapiRunning(false);
      setError("Failed to generate recipes.");
    }
  }

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-widget_light rounded-2xl shadow-xl">
      <span className="border-b-[1px]  border-primary_text_light/30 shadow-md shadow-semantic_green_light/30 mb-2 flex h-20 justify-center items-center rounded-md p-4 ">
        <div className="w-full text-secondary text-center text-primary_text_light font-normal text-4xl ">
          <h1>
            MEALT
            <span className="text-semantic_green_light font-extrabold">AI</span>
            M
          </h1>
        </div>
      </span>

      <div className=" overflow-y-scroll overflow-x-hidden input-scrollbar flex grow flex-col py-2 justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <InputSection arr={sections} />
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission behavior
            checkStore();
          }}
          className="w-full flex flex-col justify-center items-center"
        >
          <button
            type="submit" // Change type to submit
            disabled={store.apiRunning}
            className="bg-widget_light lg:hover:bg-accent_color_light text-primary_text_light lg:hover:text-white border-4 hover:border-2 border-primary_text_light rounded-xl flex flex-row items-center justify-between h-[48px] w-10/12 "
          >
            {store.apiRunning ? (
              //
              <span>CARGANDO</span>
            ) : (
              <>
                <span className="font-bold tracking-wide flex flex-row justify-center items-center w-full text-xl gap-2 ">
                  CONSULTAR
                  <span className="icon-[material-symbols--send] "></span>
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
