import { db } from "../db.js";

export function createSession(email) {
    const sessionId = crypto.randomUUID();
    db.prepare(`
        INSERT INTO sessions (id, email)
        VALUES (:sessionId, :email)
    `).run({ sessionId, email });
    return sessionId;
}