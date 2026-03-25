import { db } from "../db.js";

// get cart by user email
export function getCartByEmail(email) {
    return db.prepare(`
        SELECT * FROM carts WHERE email = ?
    `).get(email);
}

export function createCart(email) {
    const result = db.prepare(`
        INSERT INTO carts (email) VALUES (?)
    `).run(email);

    // Make sure lastInsertRowid is returned
    return { id: result.lastInsertRowid, email };
}

// get cart items with product info
export function getCartItems(cartId) {
    return db.prepare(`
        SELECT 
            cart_items.id,
            cart_items.productId,
            cart_items.quantity,
            products.productName,
            products.price
        FROM cart_items
        JOIN products ON products.productId = cart_items.productId
        WHERE cart_items.cartId = ?
    `).all(cartId);
}

// get specific item
export function getCartItem(cartId, productId) {
    return db.prepare(`
        SELECT * FROM cart_items 
        WHERE cartId = ? AND productId = ?
    `).get(cartId, productId);
}

// add item
export function addCartItem(cartId, productId, quantity) {
    return db.prepare(`
        INSERT INTO cart_items (cartId, productId, quantity)
        VALUES (?, ?, ?)
    `).run(cartId, productId, quantity);
}

// update quantity
export function updateCartItemQuantity(id, quantity) {
    return db.prepare(`
        UPDATE cart_items SET quantity = ?
        WHERE id = ?
    `).run(quantity, id);
}

// user has cart
export function ensureCartForUser(email) {
    let cart = getCartByEmail(email);
    if (!cart) {
        cart = createCart(email);
        console.log("Created new cart for user:", cart);
    }
    return cart;
}

