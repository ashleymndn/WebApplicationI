import { db } from "../db.js";

export function createOrder(email, totalAmount, addressId) {
    db.prepare(`
        INSERT INTO orders (email, totalAmount, addressId)
        VALUES (?, ?, ?)
    `).run(email, totalAmount, addressId);

    const row = db.prepare(`SELECT last_insert_rowid() as id`).get();
    return row.id;
}

export function addOrderItem(orderId, productId, quantity, price) {
    db.prepare(`
        INSERT INTO order_items (orderId, productId, quantity, price)
        VALUES (?, ?, ?, ?)
    `).run(orderId, productId, quantity, price);
}
