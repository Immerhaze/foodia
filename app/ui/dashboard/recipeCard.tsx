import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Ingredient {
  name: string;
  quantity: string;
  calories: number;
  price: number;
}

interface Recipe {
  title: string;
  ingredients: Ingredient[];
  steps: string[];
  duration: string;
}

interface RecipesProps {
  recipes: Recipe[];
}

export function RecipesCards({ recipes }: RecipesProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit(); // Reinitialize to ensure proper calculation
      console.log(emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi, recipes]);

  const sumKca = (ingredients: Ingredient[]): number => {
    return ingredients.reduce(
      (total, ingredient) => total + ingredient.calories,
      0
    );
  };

  return (
    <div
      className="embla w-full h-4/6 md:h-5/6 overflow-hidden flex flex-col"
      ref={emblaRef}
    >
      <div className="embla__container h-2/3 flex flex-row items-center">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="embla__slide h-[350px] md:h-full bg-widget_light flex-[0_0_100%] md:flex-[0_0_50%] rounded-xl shadow-md mx-2 overflow-hidden overflow-y-auto"
          >
            <h1 className="text-xl h-20 font-bold tracking-wide mb-6 p-2 bg-accent_color_light flex justify-center items-center text-center text-white">
              {recipe.title}
            </h1>
            <div className="px-4 pb-2 embla__slide-content">
              <div className="flex flex-col mb-6 gap-2 border-b-[1px] border-accent_color_light/30 pb-2">
                <div className="flex flex-row gap-2 items-center text-lg font-semibold">
                  <span className="icon-[icon-park-twotone--timer] text-xl text-chart_emerald_light"></span>
                  {recipe.duration} aprox.
                </div>
                <div className="flex flex-row gap-2 items-center text-lg font-semibold">
                  <span className="icon-[fluent-mdl2--calories] text-xl text-semantic_red_light"></span>
                  <span>{sumKca(recipe.ingredients)} Kcal aprox.</span>
                </div>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <span className="text-lg font-medium w-auto flex gap-2 justify-start items-center rounded-xl">
                      <span className="icon-[fa-solid--utensils] text-xl text-accent_color_light"></span>
                      Ingredientes
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc tracking-wide px-4 custom-list">
                      {recipe.ingredients.map((ingredient, ingIndex) => (
                        <li key={ingIndex}>
                          {ingredient.name} -{" "}
                          <span className="font-light">
                            {ingredient.calories} Kcal.
                          </span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <span className="text-lg w-auto font-medium flex gap-2 items-center">
                      <span className="icon-[ph--cooking-pot-fill] text-xl text-accent_color_light"></span>
                      Preparación
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ol className="text-base font-normal list-decimal pl-7 custom-list flex flex-col gap-2">
                      {recipe.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full h-10 flex-row justify-between items-center">
        <button
          className="embla__prev h-1/2 shadow-semantic_green_light shadow-sm bg-widget_light flex justify-center items-center"
          onClick={scrollPrev}
        >
          <span className="icon-[material-symbols--arrow-back] text-2xl"></span>
        </button>
        <button
          className="embla__next h-1/2 shadow-semantic_green_light shadow-sm bg-widget_light flex justify-center items-center"
          onClick={scrollNext}
        >
          <span className="icon-[material-symbols--arrow-forward] text-2xl"></span>
        </button>
      </div>
    </div>
  );
}
