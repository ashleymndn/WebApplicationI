import { db } from "../db.js";
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
import { getUserDetailsByEmail } from "../models/userDetails.js";

export async function cartController(ctx) {
  const { request, session, headers } = ctx;

  if (!session) {
    return redirect(headers, "/login", "Sign in to have Access");
  }

  const email = session.email;

  if (request.method === "POST") {
    const formData = await request.formData();
    const action = formData.get("action");

    if (action === "remove") {
      const cartItemId = formData.get("cartItemId");
      if (cartItemId) {
        db.prepare(`DELETE FROM cart_items WHERE id = ?`).run(cartItemId);
      }
      return redirect(headers, "/cart");
    }

    const productId = formData.get("productId");
    const quantity = Number(formData.get("quantity")) || 1;

    const product = getProductById(productId);
    if (!product) throw new Error("Product not found");

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

  const cart = getCartByEmail(email);
  const items = cart ? getCartItems(cart.id) : [];
  const addresses = getUserDetailsByEmail(email) || [];

  return render(cartView, {
    cart: items,
    addresses,
    errors: ctx.errors || {}
  }, ctx);
}