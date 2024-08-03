import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { sumKca, ingredientList } from "@/lib/utils";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
  },
  maindiv: {
    width: "100%",
    height: "50%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  maintitle: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  maintitletext: {
    normal: {
      fontSize: 50,
      fontWeight: 800,
    },
    ai: {
      color: "#45e18d",
      fontSize: 50,
      fontWeight: 800,
    },
  },
  mainwrap: {
    width: "100%",
    height: "80%",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#45E18D",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: "hidden",
    borderTop: "3px solid #e6e6e6",
    borderRight: "3px solid #e6e6e6",
  },
  opacitylayer: {
    position: "absolute",
    left: 0,
    width: "50%",
    height: "100%",
    backgroundColor: "black",
    opacity: 0.1,
  },
  grettingwrap: {
    height: "100%",
    width: "60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "left",
    paddingLeft: 10,
    textTransform: "capitalize",
  },
  usergreeting: {
    fontSize: 50,
    letterSpacing: 1,
    fontWeight: 800,
    color: "white",
  },
  imageswrap: {
    width: "40%",
    height: "100%",
  },
  image: {
    objectFit: "cover",
    objectPosition: "center",
  },
  recipessection: {
    height: "50%",
    borderTop: "2px dashed #22867E",
    paddingLeft: "20px",
    paddingRight: "20px",
    flexGrow: 1,
    backgroundColor: "#F2F8F7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  disclaimewrap: {
    height: "25%",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  disclaimer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    border: "2px dashed #F8656E",
    borderRadius: "25px",
    padding: "20px",
  },
  recipessectiontitle: {
    width: "100%",
    height: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
  cardswrappagezero: {
    height: "100%",
    flexDirection: "column",
  },
  cardzero: {
    width: "100%", // Adjust this to 48% to allow space for margins
    height: "50%",
    marginBottom: "10px", // Add some margin for spacing between cards
    display: "flex",
    flexDirection: "col",
    backgroundColor: "white",
    borderRadius: "15px",
    overflow: "hidden",
    borderRight: "1px solid #dadfde",
    borderBottom: "1px solid #dadfde",
  },
  recipetitle: {
    width: "100%",
    paddingHorizontal: "40px",
    paddingVertical: "10px",
    backgroundColor: "#22867E",
    fontSize: "32px",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  stepssection: {
    height: "100%",
    gap: "5px",
    padding: "10px",
  },
  subtitle: {
    fontSize: "18px",
    display: "flex",
    flexDirection: "row",
    color: "#324947",
  },
  text: { fontSize: "16px" },
  p: { fontSize: "18px", color: "#324947", marginVertical: "10px" },
  pagefooter: {
    fontsize: "14px",
    padding: "20px",
    color: "black",
  },
  listContainer: {
    padding: 20,
    backgroundColor: "#F2F8F7",
  },
  listTitle: {
    fontSize: 24,
    color: "#324947",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  unorderedList: {
    display: "flex",
    flexDirection: "column",
  },
  listText: {
    fontSize: 18,
    color: "#000",
    marginBottom: 5,
    letterSpacing: 1,
  },
});

// Create Document Component
const MyDocument = ({ recipes, username }) => {
  const categorizedIngredients = ingredientList({ recipes: recipes });
  const ingredientText = categorizedIngredients.join(", ");
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.maindiv}>
          <View style={styles.maintitle}>
            <Text style={styles.maintitletext.normal}>MEALT</Text>
            <Text style={styles.maintitletext.ai}>AI</Text>
            <Text style={styles.maintitletext.normal}>M</Text>
          </View>
          <View style={styles.mainwrap}>
            <View style={styles.opacitylayer}></View>
            <View style={styles.grettingwrap}>
              <Text style={styles.usergreeting}>¡Disfruta</Text>
              <Text style={styles.usergreeting}>Cocinando!</Text>
            </View>
            <View style={styles.imageswrap}>
              <Image style={styles.image} src="/pdfImages/topimage.png" />
            </View>
          </View>
        </View>
        <View style={styles.recipessection}>
          <Text style={styles.p}>Hola {username},</Text>
          <Text style={styles.p}>
            ¡La magia de la cocina ha llegado a tu bandeja de entrada! Estamos
            emocionados de presentarte unas recetas especialmente diseñadas para
            ti.
          </Text>
          <Text style={styles.p}>
            Esperamos que disfrutes cada bocado de estas recetas que han sido
            creadas usando la poderosa IA de{" "}
            <Text style={{ fontWeight: "demibold", color: "#45E18D" }}>
              Google Gemini 1.5
            </Text>
          </Text>
          <Text style={styles.p}>
            Un agradecimiento especial a{" "}
            <Link
              style={{ color: "black", fontWeight: "black" }}
              src="www.vercel.com"
            >
              Vercel
            </Link>{" "}
            por hacer posible esta experiencia de cocina personalizada.
          </Text>
          <Text style={styles.p}>
            ¡Que disfrutes cocinando y buen provecho!
          </Text>
        </View>
      </Page>
      <Page style={styles.page}>
        <View
          style={[
            styles.cardswrappagezero,
            { padding: "20px", backgroundColor: "#F2F8F7" },
          ]}
        >
          {recipes.slice(0, 2).map((recipe, index) => (
            <View key={index} style={styles.cardzero}>
              <Text style={styles.recipetitle}>{recipe.title}</Text>
              <View style={{ flexDirection: "row", padding: "10px" }}>
                <View
                  style={[
                    styles.stepssection,
                    { borderRight: "1px solid #d3e7e5", width: "40%" },
                  ]}
                >
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={[
                        styles.image,
                        { width: "18px", marginRight: "4px" },
                      ]}
                      src="/pdfImages/calories.png"
                    />
                    <Text style={styles.subtitle}>
                      {sumKca(recipe.ingredients)} -Kcal
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: "5px",
                    }}
                  >
                    <Image
                      style={[
                        styles.image,
                        { width: "24px", marginRight: "4px" },
                      ]}
                      src="/pdfImages/duration.png"
                    />
                    <Text style={styles.subtitle}>{recipe.duration}</Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={[
                        styles.image,
                        { width: "16px", marginRight: "4px" },
                      ]}
                      src="/pdfImages/ingredient.png"
                    />
                    <Text style={styles.subtitle}>Ingredientes</Text>
                  </View>
                  {recipe.ingredients.map((ingredient, idx) => (
                    <Text key={idx} style={styles.text}>
                      {ingredient.name} - {ingredient.quantity}
                    </Text>
                  ))}
                </View>
                <View style={[styles.stepssection, { width: "60%" }]}>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={[
                        styles.image,
                        { width: "18px", marginRight: "4px" },
                      ]}
                      src="/pdfImages/steps.png"
                    />
                    <Text style={[styles.subtitle]}>Preparación</Text>
                  </View>
                  {recipe.steps.map((step, idx) => (
                    <Text key={idx} style={styles.text}>
                      <Text
                        style={{
                          color: "#FF9705",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        {idx + 1}.
                      </Text>
                      {step}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
      </Page>
      <Page style={styles.page}>
        <View
          style={[
            styles.cardswrappagezero,
            { padding: "20px", backgroundColor: "#F2F8F7" },
          ]}
        >
          {recipes.slice(2, 4).map((recipe, index) => (
            <View key={index} style={styles.cardzero}>
              <Text style={styles.recipetitle}>{recipe.title}</Text>
              <View style={{ flexDirection: "row", padding: "10px" }}>
                <View
                  style={[
                    styles.stepssection,
                    { borderRight: "1px solid #d3e7e5", width: "40%" },
                  ]}
                >
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={[
                        styles.image,
                        { width: "18px", marginRight: "4px" },
                      ]}
                      src="/pdfImages/calories.png"
                    />
                    <Text style={styles.subtitle}>
                      {sumKca(recipe.ingredients)} -Kcal
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: "5px",
                    }}
                  >
                    <Image
                      style={[
                        styles.image,
                        { width: "24px", marginRight: "4px" },
                      ]}
                      src="/pdfImages/duration.png"
                    />
                    <Text style={styles.subtitle}>{recipe.duration}</Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={[
                        styles.image,
                        { width: "16px", marginRight: "4px" },
                      ]}
                      src="/pdfImages/ingredient.png"
                    />
                    <Text style={styles.subtitle}>Ingredientes</Text>
                  </View>
                  {recipe.ingredients.map((ingredient, idx) => (
                    <Text key={idx} style={styles.text}>
                      {ingredient.name} - {ingredient.quantity}
                    </Text>
                  ))}
                </View>
                <View style={[styles.stepssection, { width: "60%" }]}>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={[
                        styles.image,
                        { width: "18px", marginRight: "4px" },
                      ]}
                      src="/pdfImages/steps.png"
                    />
                    <Text style={[styles.subtitle]}>Preparación</Text>
                  </View>
                  {recipe.steps.map((step, idx) => (
                    <Text key={idx} style={styles.text}>
                      <Text
                        style={{
                          color: "#FF9705",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        {idx + 1}.
                      </Text>
                      {step}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
      </Page>
      <Page style={styles.page}>
        <View
          style={[
            styles.cardswrappagezero,
            { padding: "20px", backgroundColor: "#F2F8F7" },
          ]}
        >
          {recipes.slice(4, 6).map((recipe, index) => (
            <View key={index} style={styles.cardzero}>
              <Text style={styles.recipetitle}>{recipe.title}</Text>
              <View style={{ flexDirection: "row", padding: "10px" }}>
                <View
                  style={[
                    styles.stepssection,
                    { borderRight: "1px solid #d3e7e5", width: "40%" },
                  ]}
                >
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={[
                        styles.image,
                        { width: "18px", marginRight: "4px" },
                      ]}
                      src="/pdfImages/calories.png"
                    />
                    <Text style={styles.subtitle}>
                      {sumKca(recipe.ingredients)} -Kcal
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: "5px",
                    }}
                  >
                    <Image
                      style={[
                        styles.image,
                        { width: "24px", marginRight: "4px" },
                      ]}
                      src="/pdfImages/duration.png"
                    />
                    <Text style={styles.subtitle}>{recipe.duration}</Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={[
                        styles.image,
                        { width: "16px", marginRight: "4px" },
                      ]}
                      src="/pdfImages/ingredient.png"
                    />
                    <Text style={styles.subtitle}>Ingredientes</Text>
                  </View>
                  {recipe.ingredients.map((ingredient, idx) => (
                    <Text key={idx} style={styles.text}>
                      {ingredient.name} - {ingredient.quantity}
                    </Text>
                  ))}
                </View>
                <View style={[styles.stepssection, { width: "60%" }]}>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={[
                        styles.image,
                        { width: "18px", marginRight: "4px" },
                      ]}
                      src="/pdfImages/steps.png"
                    />
                    <Text style={[styles.subtitle]}>Preparación</Text>
                  </View>
                  {recipe.steps.map((step, idx) => (
                    <Text key={idx} style={styles.text}>
                      <Text
                        style={{
                          color: "#FF9705",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        {idx + 1}.
                      </Text>
                      {step}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
      </Page>
      <Page style={styles.page}>
        <View
          style={[
            styles.cardswrappagezero,
            { padding: "20px", backgroundColor: "#F2F8F7", height: "50%" },
          ]}
        >
          {recipes.slice(6).map((recipe, index) => (
            <View key={index} style={[styles.cardzero, { height: "100%" }]}>
              <Text style={styles.recipetitle}>{recipe.title}</Text>
              <View style={{ flexDirection: "row", padding: "10px" }}>
                <View
                  style={[
                    styles.stepssection,
                    { borderRight: "1px solid #d3e7e5", width: "40%" },
                  ]}
                >
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={[
                        styles.image,
                        { width: "18px", marginRight: "4px" },
                      ]}
                      src="/pdfImages/calories.png"
                    />
                    <Text style={styles.subtitle}>
                      {sumKca(recipe.ingredients)} -Kcal
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: "5px",
                    }}
                  >
                    <Image
                      style={[
                        styles.image,
                        { width: "24px", marginRight: "4px" },
                      ]}
                      src="/pdfImages/duration.png"
                    />
                    <Text style={styles.subtitle}>{recipe.duration}</Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={[
                        styles.image,
                        { width: "16px", marginRight: "4px" },
                      ]}
                      src="/pdfImages/ingredient.png"
                    />
                    <Text style={styles.subtitle}>Ingredientes</Text>
                  </View>
                  {recipe.ingredients.map((ingredient, idx) => (
                    <Text key={idx} style={styles.text}>
                      {ingredient.name} - {ingredient.quantity}
                    </Text>
                  ))}
                </View>
                <View style={[styles.stepssection, { width: "60%" }]}>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={[
                        styles.image,
                        { width: "18px", marginRight: "4px" },
                      ]}
                      src="/pdfImages/steps.png"
                    />
                    <Text style={[styles.subtitle]}>Preparación</Text>
                  </View>
                  {recipe.steps.map((step, idx) => (
                    <Text key={idx} style={styles.text}>
                      <Text
                        style={{
                          color: "#FF9705",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        {idx + 1}.
                      </Text>
                      {step}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Listado de Ingredientes</Text>
          <View style={styles.unorderedList}>
            <Text style={styles.listText}>{ingredientText}</Text>
          </View>
        </View>
        <View style={styles.disclaimewrap}>
          <View style={styles.disclaimer}>
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "24px",
                color: "#F8656E",
                marginBottom: "10px",
              }}
            >
              Aviso Legal
            </Text>
            <Text
              style={[
                styles.section,
                { color: "gray", fontSize: "14px", textAlign: "center" },
              ]}
            >
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
          </View>
        </View>
        <Text style={styles.pagefooter} fixed={true}>
          Visitanos en {""}
          <Link src="mealtime.online" style={{ color: "#45E18D" }}>
            mealtaim.online
          </Link>
        </Text>
      </Page>
    </Document>
  );
};

export default MyDocument;
