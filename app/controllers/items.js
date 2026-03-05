import { createItem, getItems } from "../models/items.js";
import render from "../render.js";
import { itemsView } from "../views/items.js";
import redirect from "../redirect.js";


export function itemsController({ request }) {
    const items = getItems();
    return render(itemsView, { items }, request);
}

export async function addItemController({ request }) {
    const formData = await request.formData();
    const newItem = formData.get("new-item");
    if(!newItem || newItem.length < 5) {
        const error = newItem ? `New item (${newItem}) must be minimum of 5 characters` : "New Item cannot be blank";
        const items = getItems();
        return render(itemsView, { items, error }, request, 400);
    }
    createItem(newItem);
    const headers = new Headers();
    return redirect(headers, '/items', `added '${newItem}' to the list`)

}