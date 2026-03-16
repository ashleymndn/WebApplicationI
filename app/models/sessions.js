import { db } from "../db.js";

export function createSession(email) {
    const sessionId = crypto.randomUUID();
    db.prepare(`
        INSERT INTO sessions (id, email)
        VALUES (:sessionId, :email)
    `).run({ sessionId, email });
    return sessionId;
}

export function getSession(sessionId) {
    return db.prepare(`
        SELECT * FROM sessions where id=:sessionId
    `).get({ sessionId });
}

export function deleteSession(sessionId) {
    db.prepare("DELETE FROM sessions WHERE id=:sessionId").run({ sessionId });
}