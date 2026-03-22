import render from "../render.js";
import { dashboardView } from "../views/dashboard.js";

export function dashboardController(ctx) {
    const { session } = ctx;
    return render(dashboardView, {session}, ctx);
}