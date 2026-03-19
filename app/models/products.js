import { db } from "../db.js";

export function getProducts() {
    return db.prepare(`SELECT * FROM products`).all();
}
export function getProductById(id) {
    return db.prepare(`
        SELECT * FROM products WHERE productId = ?
    `).get(id);
}