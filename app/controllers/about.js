import render from "../render.js";
import { aboutView } from "../views/about.js";


export function aboutController(ctx) {
    return render(aboutView, {}, ctx);
}

