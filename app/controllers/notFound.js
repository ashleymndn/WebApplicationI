import render from "../render.js";
import { notFoundView } from "../views/notFound.js";

export function notFoundController() {
    return render(notFoundView, {}, 404);
}