export default function render(content, status = 200) {
    const headers = new Headers();
    headers.set("content-type", "text/html");
    const html = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>My web application</title>
                <meta charset="utf-8">
                <link rel="icon" href="/assets/some-icon.svg">
                <link rel="stylesheet" href="/assets/stylesheet.css">
            </head>
            <body>
                <header>
                    <h1>My web application</h1>
                    <nav>
                        <a href="/">home</a>
                        <a href="/about">about</a>
                    </nav>
                </header>
            ${content}
            </body>
        </html>
    `
    return new Response(html, { headers, status });
}