import { escape } from "@std/html/entities";
import { getFlash } from "./flash.js";

export default function render(viewFn, data, request, status = 200) {
    const content = viewFn(data);
    const headers = new Headers();
    
    const flash = getFlash(request.headers, headers);
    const flashMessage = flash ? `
    <aside id="flash">
        <p>${escape(flash)}</p>
    </aside>
    `  : '';
    headers.set("content-type", "text/html");
    const html = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>My web application</title>
                <meta charset="utf-8">
                <link rel="icon" href="/assets/some-icon.svg">
                <link rel="stylesheet" href="/assets/style.css">
                <link href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300;400;500;700&display=swap" rel="stylesheet">
    
            </head>
            <body>
                <header>
                    <h1>My Web Application</h1>
                    <nav>
                        <a href="/">home</a>
                        <a href="/about">about</a>
                        <a href="/items">items</a>
                        <a href="/login">sign in</a>
                    </nav>
                </header>
                <main>
                ${flashMessage}
                ${content}
                </main>
                <footer>
                    <p>&copy application developers</p>
                </footer>
            </body>
        </html>
    `
    return new Response(html, { headers, status });
}