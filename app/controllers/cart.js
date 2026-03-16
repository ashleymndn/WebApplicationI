import { currentSession } from "../auth.js";
import redirect from "../redirect.js";
import render from "../render.js";
import { cartView } from "../views/cart.js";


export function cartController({ request }) {
    const session = currentSession(request.headers);
    
    if(!session) {
        const headers = new Headers();
        return redirect(headers, "/login", "Sign in to gain access");
    }

    return render(cartView, {}, request);
}