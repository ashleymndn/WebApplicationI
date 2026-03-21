import redirect from "../redirect.js";
import render from "../render.js";
import { dashboardView } from "../views/dashboard.js";

export function dashboardController(ctx) {
    const { session, headers } = ctx;
    if(!session) {
        return redirect(headers, "/login", "Sign in to gain access");
    }
    return render(dashboardView, {session}, ctx);
}