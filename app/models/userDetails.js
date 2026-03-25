import { db } from "../db.js";

// GET addresses
export function getUserDetailsByEmail(email) {
    return db.prepare(`
        SELECT * FROM user_details 
        WHERE lower(email) = lower(:email)
    `).all({ email });
}

// ADD address (max 3)
export function createUserDetails(details) {
    const count = db.prepare(`
        SELECT COUNT(*) as total 
        FROM user_details 
        WHERE lower(email) = lower(:email)
    `).get({ email: details.email });

    if (count.total >= 3) {
        throw new Error("Maximum 3 addresses allowed");
    }

    // first address becomes default
    if (count.total === 0) {
        details.isDefault = 1;
    }

    db.prepare(`
        INSERT INTO user_details 
        (email, phone, address, city, country, isDefault)
        VALUES (:email, :phone, :address, :city, :country, :isDefault)
    `).run(details);
}

// DELETE address
export function deleteUserDetails(id, email) {
    db.prepare(`
        DELETE FROM user_details 
        WHERE id = :id AND lower(email) = lower(:email)
    `).run({ id, email });
}

// SET DEFAULT
export function setDefaultAddress(id, email) {
    db.prepare(`
        UPDATE user_details 
        SET isDefault = 0 
        WHERE lower(email) = lower(:email)
    `).run({ email });

    db.prepare(`
        UPDATE user_details 
        SET isDefault = 1 
        WHERE id = :id AND lower(email) = lower(:email)
    `).run({ id, email });
}

export function updateAddress(id, email, data) {
    db.prepare(`
        UPDATE user_details
        SET phone = :phone,
            address = :address,
            city = :city,
            country = :country
        WHERE id = :id AND email = :email
    `).run({ id, email, ...data });
}