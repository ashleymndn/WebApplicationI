import { db } from "../db.js";

db.exec(`
    DROP TABLE IF EXISTS sessions;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS items;
    DROP TABLE IF EXISTS products;

    CREATE TABLE users (
        email TEXT PRIMARY KEY,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        hashedPassword TEXT NOT NULL
    );

    CREATE TABLE sessions (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        FOREIGN KEY (email) REFERENCES users(email)
    );

    CREATE TABLE items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        label TEXT NOT NULL
    );

    CREATE TABLE products (
        ProductID INTEGER PRIMARY KEY,
        ProductName TEXT NOT NULL,
        Price INTEGER NOT NULL,
        Stock INTEGER NOT NULL,
        Image TEXT
    );

    INSERT INTO products (ProductID, ProductName, Price, Stock, Image) VALUES
        (1, 'Matcha', 65, 18, 'matcha.jpg'),

        (2, 'Longjing (Dragon Well)', 45, 24, 'longjing.jpg'),
        (3, 'Sencha', 40, 16, 'sencha.png'),
        (4, 'Nilgiri Green Tea', 30, 27, 'nilgiri.jpg'),

        (5, 'Tie Guan Yin', 42, 19, 'tieguanyin.jpg'),
        (6, 'Formosa Oolong', 48, 14, 'formosa.png'),
        (7, 'Darjeeling Oolong', 50, 22, 'darjeeling.jpg'),

        (9, 'Hibiscus Flower Tea', 25, 29, 'hibiscusflower.jpg'),
        (10, 'Ranawara Tea', 24, 31, 'ranawara.jpg'),

        (12, 'White Peony Tea', 45, 20, 'whitepeony.jpg'),
        (13, 'Ceylon White Tea', 60, 9, 'whiteceylon.jpg'),

        (14, 'Assam', 28, 26, 'assam.png'),
        (15, 'Ceylon Black Tea', 30, 23, 'blackceylon.png');

    

    INSERT INTO items (label) VALUES
        ('apples'),
        ('bananas'),
        ('cherries');
`)