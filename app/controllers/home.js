import { getFilteredProducts } from "../models/filters.js";
import { getProducts } from "../models/products.js";
import render from "../render.js";
import { homeView } from "../views/home.js";


export function homeController(ctx) {
    const { session, request } = ctx;

    const url = new URL(request.url);

    const teaTypes = url.searchParams.getAll("tea_type[]").map(Number);
    const origins = url.searchParams.getAll("origin[]").map(Number);
    const sort = url.searchParams.get("sort") || "";

    let products;

   if (teaTypes.length || origins.length || sort) {
        products = getFilteredProducts({ teaTypes, origins, sort });
    } else {
        products = getProducts();
    }

    return render(homeView, { products, session, teaTypes, origins, sort }, ctx);
}

