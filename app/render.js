import { escape } from "@std/html/entities";
import { getFlash } from "./flash.js";

export default function render(viewFn, data, ctx) {
    const { request, session, headers, status = 200 } = ctx;
    const content = viewFn(data);
    const footerMessage = session 
        ? `logged in as '${session.email}'` : '';
    const links = `
        ${session 
            ? `
                <ul class="topnav">
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/cart">Cart</a></li>
                    <li><form method="POST" action="/logout"><button>Logout</button></form></li>
                </ul>
                `
            :   `<a href="/login">Login</a>`}
    `
    
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
                <link rel="icon" href="/assets/logoicon.png">
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
                        <li>${links}</li>
                        </ul>

                </div>
                
                </header>
    
                <main>
                ${flashMessage}
                ${content}
                </main>


                <footer class="footer">
                <div class="footer-container">
                    <div class="footer-col">
                    <h3>Rindo Tea</h3>
                    <p>We serve a variety of</p>
                    <p>teas from across the world.</p>
                    </div>

                    <div class="footer-col">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/cart">Cart</a></li>
                    </ul>
                    </div>

                    <div class="footer-col">
                    <h3>Contact Us</h3>
                    <p>321 Tea Garden Lane</p>
                    <p>contact@rindotea.com</p>
                    <p>(265) 345-6741</p>
                    </div>
                
                </div>

                <div class="footer-bottom">
                    <p>${footerMessage}</p>
                    <p>&copy 2026, Rindo Tea. All Rights Reserved.</p>
                </div>
                </footer>
            </body>
        </html>
    `
    return new Response(html, { headers, status });
}