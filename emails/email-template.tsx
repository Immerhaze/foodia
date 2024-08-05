// codepen-challengers — React Email

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Column,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Tailwind,
} from "@react-email/components";
import * as React from "react";
import { sumKca } from "@/lib/utils";
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

interface FormData {
  email: string;
  username: string;
}

interface EmailTemplateProps {
  formdata: FormData;
  recipes: Recipe[];
  list: string[];
}
// export const EmailTemplate = ({
//   formdata,
//   recipes,
//   list,
// }: EmailTemplateProps) => (
export const EmailTemplate = ({
  formdata,
  recipes,
  list,
}: EmailTemplateProps) => {
  const chunkSize = Math.ceil(list.length / 3); // Divide list into 3 columns
  const columns = Array.from({ length: 3 }, (_, i) =>
    list.slice(i * chunkSize, (i + 1) * chunkSize)
  );

  return (
    <Html>
      <Head />
      <Preview>Prepara tu ingredientes</Preview>
      <Tailwind>
        <Body className="w-full max-h[100%] bg-[#F2F8F7]">
          <Container className="w-full max-h[100%] bg-[#F2F8F7] p-3">
            <Heading className="w-full bg-white rounded-xl h-20 flex justify-center items-center">
              <Text className="text-6xl">
                <strong>MEALT</strong>
              </Text>
              <Text className=" text-6xl text-[#45E18D]">AI</Text>
              <Text className="text-6xl">
                <strong>M</strong>
              </Text>
            </Heading>
            <Section
              style={section}
              className="w-full bg-[#45E18D] relative flex flex-row rounded-tl-xl rounded-tr-xl overflow-hidden border-t-2 border-l-2 border-[#e6e6e6]"
            >
              <Column className="min-w-1/2  bg-[#3ecb7f] pl-4">
                <Text className="text-6xl text-white">
                  ¡Disfruta Cocinando!
                </Text>
              </Column>
              <Column className="w-1/2">
                <Img
                  src="\pdfImages\topimage.png"
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
              <Text>Hola {formdata.username},</Text>

              <Text>
                ¡La magia de la cocina ha llegado a tu bandeja de entrada!
                Estamos emocionados de presentarte unas recetas especialmente
                diseñadas para ti.
              </Text>

              <Text>
                Esperamos que disfrutes cada bocado de estas recetas que han
                sido creadas usando la poderosa IA de
                <span className={"font-semibold, text-[#45E18D] ml-1"}>
                  Google Gemini 1.5
                </span>
                🌟🍽️
              </Text>

              <Text>
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

              <Text>¡Que disfrutes cocinando y buen provecho!</Text>
            </Section>

            <Section style={section} className="p-5">
              <Text className="text-5xl text-[#324947] font-semibold uppercase">
                📝 Listado de Ingredientes
              </Text>

              <Row
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                {columns.map((column, colIndex) => (
                  <Column
                    className="shadow-sm"
                    style={{
                      flex: 1,
                      padding: "0 10px",
                      backgroundColor: "white",
                    }}
                  >
                    {column.map((ing, index) => (
                      <Text key={index} style={{ marginBottom: "5px" }}>
                        🔸 {ing}
                      </Text>
                    ))}
                  </Column>
                ))}
              </Row>
            </Section>
            <Section>
              <Text className="text-5xl text-[#324947] font-semibold ">
                📖 RECETARIO
              </Text>

              <Row>
                <Column>
                  {recipes.map((recipe) => (
                    <Container className="bg-[#22867E] rounded-xl overflow-hidden mb-5 shadow-sm">
                      <Text className="text-white text-center text-3xl p-2 font-semibold tracking-wide">
                        {recipe.title}
                      </Text>
                      <Container className="w-full h-auto bg-white flex flex-row">
                        <Column className="w-1/2 bg-white ">
                          <Container className="flex flex-col gap-1 p-3 ">
                            <Text className="text-2xl">
                              🔥{sumKca(recipe.ingredients)} - Kcal
                            </Text>

                            <Text className="text-2xl">
                              🕘 {recipe.duration}
                            </Text>
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
                        <Column className="w-1/2 border-2 bg-white px-2">
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
                </Column>
              </Row>
            </Section>

            <Section
              style={section}
              className="w-full bg-white p-5 border-dashed border-2 border-red-500 flex flex-col gap-4"
            >
              <Text className="text-red-500 text-3xl font-semibold tracking-wider text-center">
                AVISO LEGAL
              </Text>
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

            <Section style={{ padding: "20px", textAlign: "center" }}>
              <Link href="https://www.mealtaim.online/">
                <Button
                  style={{
                    background: "#45E18D", // Button background color
                    color: "#FFFFFF", // Text color
                    padding: "16px 32px", // Padding inside the button
                    textAlign: "center", // Center align text
                    borderRadius: "4px", // Rounded corners
                    textDecoration: "none", // Remove underline from the link
                    display: "inline-block", // Ensure button displays correctly
                    fontWeight: "bold", // Bold text
                    fontSize: "16px", // Font size
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Text className="text-white text-xl">
                    Ir a mealtaim.online
                  </Text>
                </Button>
              </Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const section = {
  background: "#ffffff",
  padding: "10px",
};

// const main = {
//   fontFamily: '"Google Sans",Roboto,RobotoDraft,Helvetica,Arial,sans-serif',
//   backgroundColor: "#505050",
//   margin: "0",
// };

// const header = {
//   width: "100%",
//   margin: "0 auto",
//   paddingBottom: "30px",
//   zIndex: "999",
// };
