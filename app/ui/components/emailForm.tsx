import React, { useState } from "react";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Resend } from "resend";
import { FunctionalBtn } from "./functionalBtn";

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
  recipeslist: Recipe[];
};

// Define the Zod schema
const formSchema = z.object({
  username: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Debe ser un correo electrónico válido"),
});

const EmailForm: React.FC<EmailFormProps> = ({ recipeslist }) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
  });
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
  }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [sent, setSent] = useState<boolean | null>(null);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Validate form data and handle submission
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formdata: formData, recipes: recipeslist }),
      });

      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        setFormData({ username: "", email: "" });
        console.log("Email sent successfully:", data);
        setSent(true);
      } else {
        const error = await response.json();
        console.error("Error sending email:", error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    } finally {
      setFormData({
        email: "",
        username: "",
      });
      setLoading(false);
      setSent(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <FunctionalBtn
          text="Enviar a E-mail"
          classNameIcon="icon-[mdi--email-arrow-right] text-black"
          classNameBtn="font-semibold"
        />
      </PopoverTrigger>
      <PopoverContent className="bg-accent_color_light/50">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            <span
              className="bg-accent_color_light hover:bg-semantic_green_light text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              {loading ? (
                "Enviando e-mail..."
              ) : sent ? (
                <span>
                  <span className="icon-[icon-park-twotone--success] text-semantic_green_light"></span>
                  Enviado
                </span>
              ) : (
                "Enviar al e-mail"
              )}
            </span>
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
