import { db } from "../db.js";
import { currentSession } from "../auth.js";
import { getProductById } from "../models/products.js";
import {
    getCartByEmail,
    createCart,
    getCartItems,
    getCartItem,
    addCartItem,
    updateCartItemQuantity
} from "../models/cart.js";
import redirect from "../redirect.js";
import render from "../render.js";
import { cartView } from "../views/cart.js";

export async function cartController({ request }) {
    const session = currentSession(request.headers);

    if (!session) {
        const headers = new Headers();
        return redirect(headers, "/login", "Sign in to gain access");
    }

    const email = session.email;
    

    // ✅ ADD TO CART
    if (request.method === "POST") {
    const formData = await request.formData();
    const action = formData.get("action");

    const headers = new Headers();

    // REMOVE ITEM
    if (action === "remove") {
        const cartItemId = formData.get("cartItemId");
        if (cartItemId) {
            db.prepare(`DELETE FROM cart_items WHERE id = ?`).run(cartItemId);
        }
        return redirect(headers, "/cart");
    }

    // ADD ITEM
    const productId = formData.get("productId");
    const quantity = Number(formData.get("quantity")) || 1;

    const product = getProductById(productId);
    if (!product) throw new Error("Product not found");

    // GET OR CREATE CART
    let cart = getCartByEmail(email);
    if (!cart) {
        cart = createCart(email);
    }

    const existingItem = getCartItem(cart.id, productId);
    if (existingItem) {
        updateCartItemQuantity(existingItem.id, existingItem.quantity + quantity);
    } else {
        addCartItem(cart.id, productId, quantity);
    }

    return redirect(headers, "/cart");
}

    // ✅ SHOW CART
    const cart = getCartByEmail(email);

    const items = cart ? getCartItems(cart.id) : [];

    return render(cartView, {
        cart: items
    }, request);
}