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
                <title>Rindo Tea</title>
                <meta charset="utf-8">
                <link rel="icon" href="/assets/some-icon.svg">
                <link rel="stylesheet" href="/assets/style.css">
                <link href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300;400;500;700&display=swap" rel="stylesheet">
            </head>
            
            <body>
                <header>
                    <a href="/"><img src="/assets/images/logo.png" class="logo_img"></a>
                    
                    <div class="dropdown">

                        <button class="dropbtn">☰ Menu</button>
                        
                        <ul class="topnav">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/items">Items</a></li>
                        <li><a href="/login">Account</a></li>
                        <li><a href="/cart">Cart</a></li>
                        <ul>

                </div>
                
                </header>
    
                <main>
                ${flashMessage}
                ${content}
                </main>

                <footer>
                    <p>&copy 2026, Rindo Tea. All Rights Reserved.</p>
                </footer>
            </body>
        </html>
    `
    return new Response(html, { headers, status });
}