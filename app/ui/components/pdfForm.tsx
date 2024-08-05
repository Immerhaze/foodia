import React, { useState } from "react";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "@/components/pdf/pdfDoc";
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
};

type EmailFormProps = {
  recipes: Recipe[];
};

// Define the Zod schema
const formSchema = z.object({
  username: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
});

const PdfForm: React.FC<EmailFormProps> = ({ recipes }) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
  });
  const [errors, setErrors] = useState<{ username?: string }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <Popover>
      <PopoverTrigger className=" py-1 px-1  w-2/3 md:w-1/2 flex justify-center ">
        <FunctionalBtn
          text="Descargar PDF"
          classNameIcon="icon-[ic--twotone-picture-as-pdf] text-black"
          classNameBtn="font-semibold  w-full  md:h-full"
        />
      </PopoverTrigger>
      <PopoverContent className="bg-accent_color_light/50">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={(e) => e.preventDefault()}
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
          <div className="flex items-center justify-between">
            <PDFDownloadLink
              className="w-full"
              document={
                <MyDocument username={formData.username} recipes={recipes} />
              }
              fileName={`Mealtaim_${formData.username}.pdf`}
            >
              {({ loading }) => (
                <span className="w-full flex flex-row justify-center items-center gap-2 bg-accent_color_light lg:hover:bg-semantic_green_light text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  {!loading && (
                    <span className="icon-[icon-park-twotone--success] text-2xl text-white"></span>
                  )}
                  {loading ? "Generando PDF..." : "Descargar PDF"}
                </span>
              )}
            </PDFDownloadLink>
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

export default PdfForm;
