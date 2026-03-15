import { getProducts } from "../models/products.js";
import render from "../render.js";
import { homeView } from "../views/home.js";


export function homeController({ request }) {
    const products = getProducts();
    return render(homeView, { products }, request);
}

