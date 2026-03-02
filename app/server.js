import { aboutController } from "./controllers/about.js";
import { homeController } from "./controllers/home.js";
import { addItemController, itemsController } from "./controllers/items.js";
import { notFoundController } from "./controllers/notFound.js";
import { staticController } from "./controllers/static.js";

export default function server(request) {

    const url = new URL(request.url);
    console.log(`\n${request.method} ${url.pathname} ${url.search}`);


    if(url.pathname.startsWith("/assets")) {
        return staticController({ request });
    }

    if (url.pathname == "/") {
        return homeController({ request });
    }

    if (url.pathname == "/items" && request.method == "GET") {
        return itemsController({ request });
    }

    if (url.pathname == "/items" && request.method == "POST") {
        return addItemController({ request });
    }

    if (url.pathname == "/about") {
        return aboutController({ request });
    }

    return notFoundController({ request });

}