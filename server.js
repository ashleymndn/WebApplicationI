import { serveDir } from '@std/http';

import render from "./render.js"

export default function server(request) {

    const url = new URL(request.url);
    console.log(`\n${request.method} ${url.pathname} ${url.search}`);

    if(url.pathname.startsWith("/assets")) {
        return serveDir(request);
    }


    if (url.pathname == "/") {
        return render(`
            <h2>Home Page</h2>
            <p>Hello, World</p>
        `)

    }


    
    return render(`
            <h2>Not found</h2>
            <p>The requsted resource does not exist.</p>
        `, 404)
}