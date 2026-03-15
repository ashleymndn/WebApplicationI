import { db } from "../db.js";

const salt = "secretValue";

const options = {
    name: "PBKDF2",
    hash: "SHA-256",
    iterations: 5000,
    salt: new Uint8Array(Array.from(new TextEncoder().encode(salt)))
}

export async function createUser({ firstname, lastname, email, password }) {
    const hashedPassword = await hashPassword(password);

    db.prepare(`
        INSERT INTO users (firstname, lastname, email, hashedPassword)
        VALUES (:firstname, :lastname, :email, :hashedPassword)
    `).run({firstname, lastname, email, hashedPassword});

}

async function hashPassword(password) {
    const inputBytes = new TextEncoder().encode(password);
    const key = await crypto.subtle.importKey("raw", inputBytes, "PBKDF2", false, ['deriveBits']);
    const buffer = await crypto.subtle.deriveBits(options, key, 256);
    return Array.from(new Uint8Array(buffer)).map(byte => byte.toString(16).padStart(2, 0)).join("");
}

