import render from "../render.js";
import { notFoundView } from "../views/notFound.js";

export function notFoundController(ctx) {
    return render(notFoundView, {}, ctx, 404);
}