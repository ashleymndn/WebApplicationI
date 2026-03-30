import { db } from "../db.js";

export function createMessage({ firstName, lastName, email, message }) {
    return db.prepare(`
        INSERT INTO contact_messages (firstName, lastName, email, message)
        VALUES (:firstName, :lastName, :email, :message)
    `).run({ firstName, lastName, email, message });
}