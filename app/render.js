export default function render(viewFn, data, status = 200) {
    const content = viewFn(data);
    const headers = new Headers();
    headers.set("content-type", "text/html");
    const html = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>My web application</title>
                <meta charset="utf-8">
                <link rel="icon" href="/assets/some-icon.svg">
                <link rel="stylesheet" href="/assets/style.css">
            </head>
            <body>
                <header>
                    <h1>My web application</h1>
                    <nav>
                        <a href="/">home</a>
                        <a href="/about">about</a>
                        <a href="/items">items</a>
                    </nav>
                </header>
                <main>
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