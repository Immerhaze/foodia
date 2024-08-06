"use client";
import React, { useState, useCallback } from "react";
import SideNav from "@/app/ui/dashboard/sidenav";
import { RecipesCards } from "@/app/ui/dashboard/recipeCard";
import useStore from "@/app/store";
import EmailForm from "@/app/ui/components/emailForm";
import PdfForm from "./ui/components/pdfForm";
import { PageSkeleton } from "./ui/components/pagesSkeleton";
import { FunctionalBtn } from "./ui/components/functionalBtn";
import { shouldUseFlatConfig } from "eslint/use-at-your-own-risk";

export default function Page() {
  const { error } = useStore();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [showRecipes, setShowRecipes] = useState(false);
  const [ShowForm, setShowForm] = useState(false);
  const store = useStore();

  // Handler for when recipes are generated and ready to show
  const handleRecipesGenerated = useCallback((newRecipes: any[]) => {
    setRecipes(newRecipes);
    setShowRecipes(true); // Show recipes when they are generated
  }, []);

  function handleFormMobileOn() {
    setShowForm(true);
  }
  function handleFormMobileOff() {
    setShowForm(false);
  }

  return (
    <div className="flex flex-col h-screen  md:flex-row  justify-end md:overflow-hidden p-2">
      <div
        className={`w-full h-full  md:w-1/3 lg:w-96 p-2 ${
          ShowForm ? "block" : "hidden md:block"
        }`}
      >
        <SideNav
          onRecipesGenerated={handleRecipesGenerated}
          showform={handleFormMobileOff}
          showFormOn={handleFormMobileOn}
        />
      </div>
      <div
        className={`h-full  md:w-2/3 lg:w-calc-100-minus-384px md:flex md:flex-col ${
          !ShowForm ? "block" : "hidden md:block"
        }`}
      >
        {!ShowForm && store.apiRunning ? (
          <>
            <PageSkeleton />
          </>
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
            <div className="h-calc-100-minus-40px  md:h-full flex flex-col items-center ">
              <div className="h-1/6 w-full flex justify-center items-end">
                <span className="text-2xl rounded-lg w-2/3 text-white bg-semantic_green_light font font-semibold tracking-wider flex flex-row justify-center items-center py-2">
                  <h2>RECETAS</h2>
                </span>
              </div>
              <RecipesCards recipes={recipes} />
              <div className=" py-2 w-screen h-1/6 md:hidden flex flex-col items-center justify-between">
                <EmailForm recipeslist={recipes} />
                <PdfForm recipes={recipes} />
                <FunctionalBtn
                  fn={() => handleFormMobileOn()}
                  text="Repetir"
                  classNameIcon="icon-[icon-park-twotone--back] text-white"
                  classNameBtn="font-semibold bg-chart_emerald_light text-white  w-2/3 md:w-1/2"
                />
              </div>
              <div className="hidden h-1/6  md:flex flex-crow justify-center items-center gap-3">
                <EmailForm recipeslist={recipes} />
                <PdfForm recipes={recipes} />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-20 md:hidden text-secondary text-center flex justify-center items-center text-primary_text_light font-normal text-4xl">
              <h1>
                MEALT
                <span className="text-semantic_green_light font-extrabold -ml-1">
                  AI
                </span>
                M
              </h1>
            </div>
            <div className="relative w-full h-2/6  md:h-3/6 bg-custom-background bg-center bg-cover  border-b-[2px] border-r-[2px] border-semantic_green_light overflow-hidden rounded-xl mb-2">
              <span className="absolute left-0 top-0 w-full h-full bg-accent_color_light/90" />
              <div className="z-10 w-full h-full flex flex-col gap-3 justify-evenly items-center md:justify-center px-5">
                <div className="w-full h-full z-20 flex flex-col justify-center">
                  <h1 className="font-semibold text-3xl md:text-4xl lg:text-5xl text-white">
                    Deja atrás el aburrimiento culinario.
                  </h1>
                  <h3 className="font-normal text-xl md:text-2xl lg:text-3xl text-white">
                    Descubre recetas hechas para ti.
                  </h3>
                  <FunctionalBtn
                    fn={() => handleFormMobileOn()}
                    text=" Ir a formulario"
                    classNameIcon="icon-[lets-icons--form-duotone-line] text-black"
                    classNameBtn="font-semibold md:hidden"
                  />
                </div>
              </div>
            </div>
            <div className="rounded-xl p-3 md:h-3/6 flex flex-col gap-2 bg-white border-[1px] shadow-sm">
              <div>
                <h2 className="text-xl md:text-xl text-accent_color_light font-semibold tracking-wide">
                  MODO DE USO
                </h2>

                <div className="text-left text-base  tracking-wide flex flex-col gap-2">
                  <p>
                    <span className="hidden md:block">
                      A tu izquierda encontrarás el formulario de consulta.
                    </span>{" "}
                    Los únicos campos obligatorios son aquellos marcados con un
                    asterisco en el título
                    <strong>(objetivo, tipo de cuerpo, dieta)</strong>.
                  </p>
                  <p>
                    Completar los campos adicionales contribuirá a crear un
                    recetario de almuerzos más preciso y personalizado.
                  </p>
                  <p>
                    Especialmente, te recomendamos completar los primeros cinco
                    campos, ya que son esenciales para calcular con precisión tu
                    gasto calórico diario.
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-xl md:text-xl text-accent_color_light font-semibold tracking-wide">
                  PASOS
                </h2>
                <div className="text-base md:text-base">
                  <ul className="flex flex-col gap-2">
                    <li>
                      <span className="text-semantic_green_light font-bold md:text-xl mr-2">
                        1.
                      </span>
                      <strong>Rellena el formulario:</strong> Completa los
                      campos necesarios.
                    </li>
                    <li>
                      <span className="text-semantic_green_light font-bold md:text-xl mr-2">
                        2.
                      </span>
                      <strong>Obtén tus recetas:</strong> Recibe tus recetas
                      personalizadas.
                    </li>
                    <li>
                      <span className="text-semantic_green_light font-bold md:text-xl mr-2">
                        3.
                      </span>
                      <strong>Descarga el PDF:</strong> Guarda tu recetario en
                      formato PDF.
                    </li>
                    <li>
                      <span className="text-semantic_green_light font-bold md:text-xl mr-2">
                        4.
                      </span>
                      <strong>O via E-mail:</strong> Manda el recetario a tu
                      correo electrónico preferido.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
