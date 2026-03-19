export function cartView({ cart }) {
    const items = cart.map(item => `
        <div class="cart-item">
            <h3>${item.productName}</h3>
            <p>Price: ${item.price} AED</p>
            <p>Qty: ${item.quantity}</p>
            <p>Total: ${item.price * item.quantity} AED</p>

            <!-- REMOVE BUTTON -->
            <form method="POST" action="/cart">
                <input type="hidden" name="action" value="remove">
                <input type="hidden" name="cartItemId" value="${item.id}">
                <button type="submit">Remove</button>
            </form>
        </div>
    `).join("");

    return `
        <h1>Cart</h1>
        ${items || "<p>Cart is empty</p>"}
    `;
}