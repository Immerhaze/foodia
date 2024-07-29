import React, { useState } from "react";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

type FormData = {
  username: string;
  email: string;
};

type EmailFormProps = {
  recipes: Recipe[];
};

// Define the Zod schema
const formSchema = z.object({
  username: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Debe ser un correo electrónico válido"),
});

const EmailForm: React.FC<EmailFormProps> = ({ recipes }) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
  });
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
  }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Generate email body
  const generateEmailBody = () => {
    return `
      <p>Hola ${formData.username},</p>
      <p>Aquí están las recetas creadas con inteligencia artificial:</p>
      ${recipes
        .map(
          (recipe) => `
          <div style="margin-bottom: 20px;">
            <h3>${recipe.title}</h3>
            <p><strong>Duración:</strong> ${recipe.duration}</p>
            <p><strong>Ingredientes:</strong></p>
            <ul>
              ${recipe.ingredients
                .map(
                  (ingredient) => `
                  <li>
                    ${ingredient.name} - ${ingredient.quantity} 
                    (${ingredient.calories} calorías)
                  </li>`
                )
                .join("")}
            </ul>
            <p><strong>Pasos:</strong></p>
            <ol>
              ${recipe.steps.map((step) => `<li>${step}</li>`).join("")}
            </ol>
          </div>`
        )
        .join("")}
      <p>¡Disfruta tus recetas!</p>
      <p style="color:gray">
      <strong>Aviso Legal:</strong>
      Las recetas proporcionadas en esta plataforma son generadas por inteligencia artificial (IA). 
      Aunque buscamos la precisión, podrían contener errores. Revise siempre los ingredientes y pasos. 
      Verifique las recetas en caso de alergias o intolerancias alimentarias.
      Consulte a un profesional de la salud para dietas específicas. 
      Los resultados pueden variar según los ingredientes y métodos de cocción utilizados. 
      No nos hacemos responsables de daños o inconvenientes derivados del uso de estas recetas. 
      Cocine con precaución y disfrute.
      </p>
    `;
  };

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Validate form data and handle submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      formSchema.parse(formData);
      const form = e.currentTarget;
      const formDataObj = new FormData(form);
      formDataObj.append("username", formData.username);
      formDataObj.append("email", formData.email);
      formDataObj.append("message", generateEmailBody());

      const response = await fetch(
        "https://formsubmit.co/nico.rc8@hotmail.com",
        {
          method: "POST",
          body: formDataObj,
        }
      );

      // Check if the response is not JSON
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        setSuccessMessage("Recetas enviadas exitosamente!");
        setFormData({ username: "", email: "" });
      } else {
        // Handle non-JSON response
        const text = await response.text();
        console.error("Unexpected response format:", text);
        setSuccessMessage("Error al enviar las recetas.");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { username?: string; email?: string } = {};
        error.errors.forEach((err) => {
          if (err.path.includes("username")) fieldErrors.username = err.message;
          if (err.path.includes("email")) fieldErrors.email = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Error sending email:", error);
        setSuccessMessage("Error al enviar las recetas.");
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <span className="font-bold tracking-wide w-full text-xl bg-white border-2 p-2 rounded-xl shadow-sm shadow-semantic_green_light">
          <span className="icon-[mdi--email-arrow-right] text-xl mr-2"></span>
          Enviar al e-mail
        </span>
      </PopoverTrigger>
      <PopoverContent className="bg-accent_color_light/50">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Nombre
            </label>
            <input
              className={`shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.username ? "border-red-500" : ""
              }`}
              id="username"
              name="username"
              type="text"
              placeholder="John Doe"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic">{errors.username}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              className={`shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : ""
              }`}
              id="email"
              name="email"
              type="email"
              placeholder="JohnDoe@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-accent_color_light hover:bg-semantic_green_light text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Enviar Recetas
            </button>
          </div>
          {successMessage && (
            <p className="text-green-500 text-xs italic mt-2">
              {successMessage}
            </p>
          )}
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default EmailForm;
