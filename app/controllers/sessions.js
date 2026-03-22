import { login, logout } from "../auth.js";
import { ensureCartForUser } from "../models/cart.js";
import { checkCredentials } from "../models/users.js";
import redirect from "../redirect.js";
import render from "../render.js";
import { loginFormView } from "../views/auth.js";

export function loginFormController(ctx) {
    const { errors } = ctx;
    return render(loginFormView, { errors }, ctx);
}

export async function addSessionController(ctx, next) {
    const { isValid, validated, headers } = ctx;
    if (!isValid) return next(ctx);
    // validate the incoming data here
    const validCredentials = await checkCredentials(validated);
    if (!validCredentials) {
        return redirect(headers, "/login", "invalid credentials");
    }
    login(headers, validated.email);
    ensureCartForUser(validated.email);
    return redirect(headers, "/", `Logged in as '${validated.email}'`)   
}

export function deleteSessionController(ctx) {
    const { session, headers } = ctx;
    if(session) logout(headers, session.id);
    return redirect(headers, "/", "logged out");
}