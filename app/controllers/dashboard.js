import { currentSession } from "../auth.js";
import redirect from "../redirect.js";
import render from "../render.js";
import { dashboardView } from "../views/dashboard.js";

export function dashboardController({ request }) {
    const session = currentSession(request.headers);
    if(!session) {
        const headers = new Headers();
        return redirect(headers, "/login", "Sign in to gain access");
    }
    return render(dashboardView, {session}, request);
}