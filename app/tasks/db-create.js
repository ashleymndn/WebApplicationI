import { db } from "../db.js";

db.exec(`
    DROP TABLE IF EXISTS cart_items;
    DROP TABLE IF EXISTS carts;
    DROP TABLE IF EXISTS user_details;
    DROP TABLE IF EXISTS tea_types;
    DROP TABLE IF EXISTS origins;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS items;
    DROP TABLE IF EXISTS sessions;
    DROP TABLE IF EXISTS users;



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
        productId INTEGER PRIMARY KEY,
        productName TEXT NOT NULL,
        price INTEGER NOT NULL,
        stock INTEGER NOT NULL,
        image TEXT
        tea_type_id INTEGER,
        origin_id INTEGER,

        FOREIGN KEY (tea_type_id) REFERENCES tea_types(id),
        FOREIGN KEY (origin_id) REFERENCES origins(id)
        
    );

    CREATE TABLE tea_types (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
    );

    CREATE TABLE origins (
        id INTEGER PRIMARY KEY,
        country TEXT NOT NULL
    );

    CREATE TABLE user_details (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        country TEXT NOT NULL,
        isDefault INTEGER DEFAULT 0,
        FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
    );


    CREATE TABLE carts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        FOREIGN KEY (email) REFERENCES users(email)
    );

    CREATE TABLE cart_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cartId INTEGER NOT NULL,
        productId INTEGER NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,

        FOREIGN KEY (cartId) REFERENCES carts(id) ON DELETE CASCADE,
        FOREIGN KEY (productId) REFERENCES products(productId)
    );


    INSERT INTO tea_types (id, name) VALUES
        (1, 'Matcha'),
        (2, 'Green'),
        (3, 'Oolong'),
        (4, 'Herbal'),
        (5, 'White'),
        (6, 'Black');

    INSERT INTO origins (id, country) VALUES
        (1, 'Japan'),
        (2, 'China'),
        (3, 'India'),
        (4, 'Sri Lanka'),
        (5, 'Taiwan'),
        (6, 'South Africa');


    INSERT INTO products (productId, productName, price, stock, image, tea_type_id, origin_id) VALUES
        (1, 'Matcha', 65, 18, 'matcha.jpg', 1, 1),
        (2, 'Longjing (Dragon Well)', 45, 24, 'longjing.jpg', 2, 2),
        (3, 'Sencha', 40, 16, 'sencha.png', 2, 1),
        (4, 'Nilgiri Green Tea', 30, 27, 'nilgiri.jpg', 2, 3),
        (5, 'Tie Guan Yin', 42, 19, 'tieguanyin.jpg', 3, 2),
        (6, 'Formosa Oolong', 48, 14, 'formosa.png', 3, 5),
        (7, 'Darjeeling Oolong', 50, 22, 'darjeeling.jpg', 3, 3),
        (9, 'Hibiscus Flower Tea', 25, 29, 'hibiscusflower.jpg', 4, 6),
        (10, 'Ranawara Tea', 24, 31, 'ranawara.jpg', 4, 4),
        (12, 'White Peony Tea', 45, 20, 'whitepeony.jpg', 5, 2),
        (13, 'Ceylon White Tea', 60, 9, 'whiteceylon.jpg', 5, 4),
        (14, 'Assam', 28, 26, 'assam.png', 6, 3),
        (15, 'Ceylon Black Tea', 30, 23, 'blackceylon.png', 6, 4);

    INSERT INTO items (label) VALUES
        ('apples'),
        ('bananas'),
        ('cherries');

    


`)