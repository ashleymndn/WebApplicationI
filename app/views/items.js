import { escape } from "@std/html/entities";

export function itemsView({ items, error = {} }) {

    const listItems = items.map(item => `<li>${escape(item.label)}</li>`).join("\n");
    
    const errorMessage = error.error ? `<p class="error">${escape(error.message)}</p>` :  '';

    return `
    <section aria-label="items-section">
        <h2>A list of items</h2>
        <form method="POST" class="new-item">
            <label for="new-item">New Item:</label>
            <input id="new-item" name="new-item" required minlength="5">
            ${errorMessage}
        </form>
        <ul>
        ${listItems}
        </ul>
    </section>        
    `
}