import{ Database } from '@db/sqlite';

export const db = new Database('application.db');

export const dbProducts = new Database('products.db');

