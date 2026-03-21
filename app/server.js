import { aboutController } from "./controllers/about.js";
import { cartController } from "./controllers/cart.js";
import { dashboardController } from "./controllers/dashboard.js";
import { homeController } from "./controllers/home.js";
import { addItemController, itemsController } from "./controllers/items.js";
import { notFoundController } from "./controllers/notFound.js";
import { addSessionController, deleteSessionController, loginFormController } from "./controllers/sessions.js";
import { staticController } from "./controllers/static.js";
import { addUserController, registrationFormController } from "./controllers/users.js";
import ApplicationRouter from "./router.js";

const app = new ApplicationRouter();

app.get("/assets/*", staticController);
app.get("/", homeController);
app.get("/items", itemsController);
app.post("/items", addItemController);
app.get("/about", aboutController);
app.get("/login", loginFormController);
app.post("/login", addSessionController);
app.get("/register", registrationFormController);
app.post("/register", addUserController);
app.get("/dashboard", dashboardController);
app.get("/cart", cartController);
app.post("/cart", cartController);
app.post("/logout", deleteSessionController);

app.get("*", notFoundController);
app.post("*", notFoundController);

export default function server(request) {

    const url = new URL(request.url);
    console.log(`\n${request.method} ${url.pathname} ${url.search}`);

    return app.handle({ request });


    // if(url.pathname.startsWith("/assets")) {
    //     return staticController({ request });
    // }

    // if (url.pathname == "/") {
    //     return homeController({ request });
    // }


    // if (url.pathname == "/items" && request.method == "GET") {
    //     return itemsController({ request });
    // }

    // if (url.pathname == "/items" && request.method == "POST") {
    //     return addItemController({ request });
    // }

    // if (url.pathname == "/about"  && request.method == "GET") {
    //     return aboutController({ request });
    // }

    // if (url.pathname == "/login" && request.method == "GET") {
    //     return loginFormController({ request });
    // }

    // if (url.pathname == "/register" && request.method == "GET") {
    //     return registrationFormController({ request });
    // }

    // if (url.pathname == "/login" && request.method == "POST") {
    //     return addSessionController({ request });
    // }

    // if (url.pathname == "/register" && request.method == "POST") {
    //     return addUserController({ request });
    // }

    // if (url.pathname == "/dashboard" && request.method == "GET") {
    //     return dashboardController({ request });
    // }

    // if (url.pathname == "/cart" && request.method == "GET") {
    //     return cartController({ request });
    // }

    // if (url.pathname == "/cart" && request.method == "POST") {
    //     return cartController({ request });
    // }

    // if (url.pathname == "/logout" && request.method == "POST") {
    //     return deleteSessionController({ request });
    // }


    // return notFoundController({ request });

}