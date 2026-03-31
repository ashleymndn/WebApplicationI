import { createMessage } from "../models/contact.js";
import render from "../render.js";
import redirect from "../redirect.js";
import { contactFormView } from "../views/contact.js";

export function contactController(ctx) {
    return render(contactFormView, { errors: {}, values: {} }, ctx);
}

export async function submitContactController(ctx) {
    const { headers, isValid, errors, validated } = ctx;

    if (!isValid) {
        return render(contactFormView, { errors, values: validated }, ctx);
    }

    await createMessage(id, {
        firstName: validated.firstName,
        lastName: validated.lastName,
        email: validated.email,
        message: validated.message,
    });
        

    return redirect(headers, "/contact", `Message sent to Rindo Tea!`);
}