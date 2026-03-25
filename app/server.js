import { aboutController } from "./controllers/about.js";
import { cartController } from "./controllers/cart.js";
import { dashboardController } from "./controllers/dashboard.js";
import { homeController } from "./controllers/home.js";
import { addItemController, itemsController } from "./controllers/items.js";
import { notFoundController } from "./controllers/notFound.js";
import { addSessionController, deleteSessionController, loginFormController } from "./controllers/sessions.js";
import { staticController } from "./controllers/static.js";
import { addUserController, registrationFormController } from "./controllers/users.js";
import { excludesSession, requiresSession, withSession } from "./middleware/auth.js";
import { withHeaders } from "./middleware/headers.js";
import { withLogs } from "./middleware/logging.js";
import ApplicationRouter from "./router.js";
import { newItemSchema } from "./schema/newItem.js";
import { validate } from "./middleware/validate.js";
import { userSchemaLogin, userSchemaRegister } from "./schema/user.js";
import { addAddressController, deleteAddressController, editAddressController, setDefaultController } from "./controllers/userDetails.js";

const app = new ApplicationRouter();

// middleware functions
app.use(withLogs);
app.use(withHeaders);
app.use(withSession);


//router
app.get("/assets/*", staticController);
app.get("/", homeController);
app.get("/items", itemsController, requiresSession);
app.post("/items", itemsController, requiresSession, validate(newItemSchema), addItemController);
app.get("/about", aboutController);
app.get("/register", registrationFormController, excludesSession);
app.post("/register", registrationFormController, excludesSession, validate(userSchemaRegister), addUserController);
app.get("/login", loginFormController, excludesSession);
app.post("/login", loginFormController, excludesSession, validate(userSchemaLogin), addSessionController);
app.get("/dashboard", dashboardController, requiresSession);
app.get("/cart", cartController, requiresSession);
app.post("/cart", cartController, requiresSession);
app.post("/address/add", addAddressController, requiresSession);
app.post("/address/delete", deleteAddressController, requiresSession);
app.post("/address/default", setDefaultController, requiresSession);
app.post("/address/edit", editAddressController, requiresSession);
app.post("/address/checkout", cartController, requiresSession);
app.post("/logout", deleteSessionController, requiresSession);

app.get("*", notFoundController);
app.post("*", notFoundController);

export default function server(request) {
    return app.handle({ request });
}

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


    // return notFoundController({ request });\

    // }

