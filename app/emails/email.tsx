"use client";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Column,
  Tailwind,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Html,
} from "@react-email/components";
import * as React from "react";
import { ingredientList, sumKca } from "@/lib/utils";

type Ingredient = {
  name: string;
  quantity: string;
  calories: number;
  price: number;
};

type Recipe = {
  title: string;
  ingredients: Ingredient[];
  steps: string[];
  duration: string;
};

interface emailprops {
  username: string;
  recipes: Recipe[];
}

export const RecipesEmail = ({ username, recipes }: emailprops) => {
  const categorizedIngredients = ingredientList({ recipes: recipes });
  return (
    <Html>
      <Head />
      <Preview>Recetas pensadas para ti!</Preview>;
      <Tailwind>
        <Body className="bg-[#F2F8F7] font-sans">
          <Container style={container}>
            <Heading className="w-full bg-white rounded-xl h-20 flex justify-center items-center">
              <Text className="text-6xl">
                <strong>MAILT</strong>
              </Text>
              <Text className=" text-6xl text-[#45E18D]">AI</Text>
              <Text className="text-6xl">
                <strong>M</strong>
              </Text>
            </Heading>
            <Section className="w-full bg-[#45E18D] relative flex flex-row rounded-tl-xl rounded-tr-xl overflow-hidden border-t-2 border-l-2 border-[#e6e6e6]">
              <Column className="min-w-1/2  bg-[#3ecb7f] pl-4">
                <Text className="text-6xl text-white">
                  ¡Disfruta Cocinando!
                </Text>
              </Column>
              <Column className="w-1/2">
                <Img
                  src="http://localhost:3000/pdfImages/topimage.png"
                  alt="Illustration of two people eating food at a table"
                  width="300"
                  height="300"
                />
              </Column>
            </Section>

            <Section
              style={section}
              className="border-dashed border-t-2 border-[#324947]"
            >
              <Text style={text}>Hola {username},</Text>

              <Text style={text}>
                ¡La magia de la cocina ha llegado a tu bandeja de entrada!
                Estamos emocionados de presentarte unas recetas especialmente
                diseñadas para ti.
              </Text>

              <Text style={text}>
                Esperamos que disfrutes cada bocado de estas recetas que han
                sido creadas usando la poderosa IA de
                <span className={"font-semibold, text-[#45E18D] ml-1"}>
                  Google Gemini 1.5
                </span>
                🌟🍽️
              </Text>

              <Text style={text}>
                Un agradecimiento especial a ✨{" "}
                <Link
                  className={
                    "text-black font-bold  tracking-widest underline cursor-pointer"
                  }
                  href="www.vercel.com"
                >
                  Vercel
                </Link>{" "}
                ✨ por hacer posible esta experiencia de cocina personalizada.
              </Text>

              <Text style={text}>
                ¡Que disfrutes cocinando y buen provecho!
              </Text>
            </Section>

            <Section className="p-5">
              <Text className="text-5xl text-[#324947] font-semibold uppercase">
                📝 Listado de Ingredientes
              </Text>
              <ul className="grid grid-cols-4 bg-white rounded-xl  list-disc">
                {categorizedIngredients.map((ing, index) => (
                  <Text>🔸{ing}</Text>
                ))}
              </ul>
            </Section>
            <Section className="p-5">
              <Text className="text-5xl text-[#324947] font-semibold ">
                📖 RECETARIO
              </Text>

              {recipes.map((recipe, index) => (
                <Container
                  key={index}
                  className="bg-[#22867E] rounded-xl overflow-hidden mb-5 shadow-sm"
                >
                  <Text className="text-white text-center text-3xl p-2 font-semibold tracking-wide">
                    {recipe.title}
                  </Text>
                  <Container className="w-full bg-white  flex flex-row">
                    <Column className="w-1/2 ">
                      <Container className="flex flex-col gap-1 p-3 ">
                        <Text className="text-2xl">
                          🔥{sumKca(recipe.ingredients)} - Kcal
                        </Text>

                        <Text className="text-2xl">🕘 {recipe.duration}</Text>
                        <Text className="text-2xl text-[#324947] font-semibold">
                          🍴 Ingredientes
                        </Text>
                        <ul>
                          {recipe.ingredients.map((ingredient, idx) => (
                            <li>
                              <Text key={idx} className="text-base">
                                {ingredient.name} - {ingredient.quantity}
                              </Text>
                            </li>
                          ))}
                        </ul>
                      </Container>
                    </Column>
                    <Column className="w-1/2 border-2 bg-[#fff5e6] px-2">
                      <Text className="text-2xl text-[#324947] font-semibold pt-3">
                        🍳Preparación
                      </Text>
                      <Container className="flex flex-col gap-1 ">
                        {recipe.steps.map((step, idx) => (
                          <Text key={idx} className="text-base">
                            <span
                              style={{
                                color: "#FF9705",
                                fontSize: "18px",
                                fontWeight: "bold",
                              }}
                            >
                              {idx + 1}.{" "}
                            </span>
                            {step}
                          </Text>
                        ))}
                      </Container>
                    </Column>
                  </Container>
                </Container>
              ))}
            </Section>

            <Section className="w-full bg-white p-5 border-dashed border-2 border-red-500 flex flex-col gap-4">
              <Text className="text-red-500 text-3xl font-semibold tracking-wider text-center">
                AVISO LEGAL
              </Text>{" "}
              <Text className="text-lg tracking-wide text-center">
                {
                  " Las recetas proporcionadas en esta plataforma son generadas por inteligencia artificial (IA). "
                }
                {
                  "Aunque buscamos la precisión, podrían contener errores. Revise siempre los ingredientes y pasos. "
                }
                {
                  "Verifique las recetas en caso de alergias o intolerancias alimentarias. "
                }
                {
                  "Consulte a un profesional de la salud para dietas específicas. "
                }
                {
                  "Los resultados pueden variar según los ingredientes y métodos de cocción utilizados. "
                }
                {
                  "No nos hacemos responsables de daños o inconvenientes derivados del uso de estas recetas. "
                }
                {"Cocine con precaución y disfrute."}
              </Text>
            </Section>

            <Section style={goToChallenge}>
              <Button
                style={footerButton}
                className="bg-[#45E18D] text-white uppercase shadow-md cursor-pointer"
              >
                Ir a mealtaim.online
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default RecipesEmail;

const container = {
  margin: "0 auto",
  width: "648px",
  maxWidth: "100%",
  position: "relative" as const,
};

const section = {
  margin: "0",
  background: "#fff",
  padding: "0 24px",
};

const text = {
  fontSize: "16px",
};

const card = {
  padding: "20px",
  margin: "0 0 20px 0",
  borderRadius: "10px",
  fontSize: "36px",
  textAlign: "center" as const,
};

const goToChallenge = {
  margin: "40px 0 120px 0",
  textAlign: "center" as const,
};

const footerButton = {
  fontSize: "26px",
  color: "#15c",
  background: "#222",
  borderRadius: "4px",
  fontWeight: "bold",
  cursor: "pointer",
  padding: "15px 30px",
};

const footer = {
  background: "#fff",
  color: "#505050",
  padding: "0 24px",
  marginBottom: "48px",
};

const footerText = {
  fontSize: "13px",
};

const footerLink = {
  textDecoration: "underline",
  color: "#505050",
  cursor: "pointer",
};
