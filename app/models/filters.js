import { db } from "../db.js";

export function getFilteredProducts({ teaTypes, origins, sort }) {
    let query = `SELECT * FROM products WHERE 1=1`;
    const params = [];

    if (teaTypes.length) {
        query += ` AND tea_type_id IN (${teaTypes.map(() => "?").join(",")})`;
        params.push(...teaTypes);
    }

    if (origins.length) {
        query += ` AND origin_id IN (${origins.map(() => "?").join(",")})`;
        params.push(...origins);
    }

    if (sort === "price_asc") {
        query += " ORDER BY price ASC";
    } else if (sort === "price_desc") {
        query += " ORDER BY price DESC";
    }

    console.log(query);
    console.log(params);

    return db.prepare(query).all(...params);
}