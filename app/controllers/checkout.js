import { db } from "../db.js";
import { getCartByEmail, getCartItems } from "../models/cart.js";
import { createOrder, addOrderItem } from "../models/orders.js";
import { decreaseStock } from "../models/products.js";
import redirect from "../redirect.js";

export async function checkoutController(ctx) {
    const { session, request, headers } = ctx;

    if (!session) return redirect(headers, "/login");

    const formData = await request.formData();
    const addressId = formData.get("addressId");
    
    
    if (!addressId) {
        return redirect(headers, "/cart", "Please select a delivery address");
    }

    const email = session.email;

    const cart = getCartByEmail(email);
    const items = cart ? getCartItems(cart.id) : [];

    if (items.length === 0) {
        return redirect(headers, "/cart");
    }

    let totalAmount = 0;
    for (const item of items) {
        totalAmount += item.price * item.quantity;
    }

    const orderId = createOrder(email, totalAmount, addressId);

    for (const item of items) {
        addOrderItem(orderId, item.productId, item.quantity, item.price);
        decreaseStock(item.productId, item.quantity);
    }

    db.prepare(`DELETE FROM cart_items WHERE cartId = ?`).run(cart.id);

    return redirect(headers, "/cart", "Order placed successfully!");
}