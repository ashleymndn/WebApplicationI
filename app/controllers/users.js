import { login } from "../auth.js";
import { ensureCartForUser } from "../models/cart.js";
import { createUser } from "../models/users.js";
import redirect from "../redirect.js";
import render from "../render.js";
import { registrationFormView } from "../views/auth.js";

export function registrationFormController(ctx) {
    const { errors } = ctx;
    return render(registrationFormView, { errors }, ctx);
}

export async function addUserController(ctx, next) {
    const { isValid, validated, headers } = ctx;
    if (!isValid) return next(ctx);
    //create the user record here
    await createUser(validated);
    console.log("created user"); 
    ensureCartForUser(validated.email);
    login(headers, validated.email);
    return redirect(headers, "/", `User with '${validated.email}' account created`)

    
}