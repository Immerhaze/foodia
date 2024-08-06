import { EmailTemplate } from "@/emails/email-template";
import { Resend } from "resend";
import * as React from "react";
import { ingredientList } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request, res: Response) {
  const { formdata, recipes } = await request.json();

  const categorizedIngredients = ingredientList({ recipes: recipes });
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { data, error } = await resend.emails.send({
      from: "Mealtaim <recetas@mealtaim.online>",
      to: [`${formdata.email}`],
      subject: "Recetas creadas para ti!",
      // react: render(EmailTemplate() as React.ReactElement),
      react: EmailTemplate({
        formdata: formdata,
        recipes: recipes,
        list: categorizedIngredients,
      }) as React.ReactElement,
      // html: "<h1>hola ahora </h1>",
    });

    if (error) {
      return NextResponse.json({ success: false, error: error });
    }

    return NextResponse.json({ success: true, response: data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
