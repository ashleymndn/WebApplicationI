import render from "../render.js";
import { notFoundView } from "../views/notFound.js";

export function notFoundController({ request }) {
    return render(notFoundView, {}, request, 404);
}