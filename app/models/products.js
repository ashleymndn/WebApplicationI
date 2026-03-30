import { db } from "../db.js";

export function getProducts() {
    return db.prepare(`SELECT * FROM products`).all();
}
export function getProductById(id) {
    return db.prepare(`
        SELECT * FROM products WHERE productId = ?
    `).get(id);
}

export function decreaseStock(productId, quantity) {
    const product = getProductById(productId);
    if (!product || product.stock < quantity) {
        throw new Error("Not enough stock");
    }
    return db.prepare(`
        UPDATE products
        SET stock = stock - ?
        WHERE productId = ?
    `).run(quantity, productId);
}