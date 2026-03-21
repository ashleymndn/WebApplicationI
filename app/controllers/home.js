import { getProducts } from "../models/products.js";
import render from "../render.js";
import { homeView } from "../views/home.js";


export function homeController(ctx) {
    const { session } = ctx;
    const products = getProducts();
    return render(homeView, { products, session }, ctx);
}
