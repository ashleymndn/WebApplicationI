import { login } from "../auth.js";
import { ensureCartForUser } from "../models/cart.js";
import { createUser } from "../models/users.js";
import redirect from "../redirect.js";
import render from "../render.js";
import { userSchemaRegister } from "../schema/user.js";
import { validateSchema } from "../validation.js";
import { registrationFormView } from "../views/auth.js";

export function registrationFormController({ request }) {
    return render(registrationFormView, {}, request);
}

export async function addUserController({ request }) {
    const formData = await request.formData();
    const {isValid, errors, validated} = validateSchema(formData, userSchemaRegister);
    if (!isValid) {
        return render(registrationFormView, { errors }, request, 400);
    }
    //create the user record here
    await createUser(validated);
    const headers = new Headers();
    ensureCartForUser(validated.email);
    login(headers, validated.email);
    return redirect(headers, "/", `User with '${validated.email}' account created`)

    
}