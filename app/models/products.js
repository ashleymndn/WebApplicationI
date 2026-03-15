import { db } from "../db.js";

export function getProducts() {
    return db.prepare(`SELECT * FROM products`).all();
}