import render from "../render.js";
import { aboutView } from "../views/about.js";


export function aboutController({ request }) {
    return render(aboutView, {}, request);
}

