import { createItem, getItems } from "../models/items.js";
import render from "../render.js";
import { itemsView } from "../views/items.js";
import redirect from "../redirect.js";
import { validateSchema } from "../validation.js";
import { newItemSchema } from "../schema/newItem.js";


export function itemsController(ctx) {
    const { request } = ctx;
    const items = getItems();
    return render(itemsView, { items }, request, ctx);
}

export async function addItemController(ctx) {
    const { request, headers } = ctx;
    const formData = await request.formData();
    const { isValid, errors } = validateSchema(formData, newItemSchema);
    const newItem = formData.get("new-item");
    if (!isValid) {
        const items = getItems();
        return render(itemsView, { items, errors }, request, ctx, 400);
    }
    createItem(newItem);
    return redirect(headers, '/items', `added '${newItem}' to the list`);

}