export function cartView({ cart = {}, addresses = {} }) {
  const items = cart.length 
    ? cart.map(item => `
      <div class="cart-item">
          <h3>${item.productName}</h3>
          <p>Price: ${item.price} AED</p>
          <p>Qty: ${item.quantity}</p>
          <p>Total: ${item.price * item.quantity} AED</p>
          
          <form method="POST" action="/cart">
            <input type="hidden" name="action" value="remove" />
            <input type="hidden" name="cartItemId" value="${item.id}" />
            <button type="submit">Remove</button>
          </form>
        </div>`
      )
    : `<p>Cart is empty</p>`;

  const addressList = addresses.length
    ? addresses.map(addr => `
      <div class="address-card">
          <label class="address-label">
            <input 
              type="radio" 
              name="selectedAddress" 
              value="${addr.id}" 
              ${addr.isDefault ? 'checked' : ''}>
            <div class="address-info">
              <strong>${addr.address}</strong>
              <span>${addr.city}, ${addr.country}</span>
              <span>${addr.phone}</span>
            </div>
          </label>
          ${addr.isDefault ? '<span class="default">Default</span>' : ''}
          <div class="address-actions">
            <form method="POST" action="/address/delete">
              <input type="hidden" name="id" value="${addr.id}">
              <button class="btn delete">Delete</button>
            </form>
            <form method="POST" action="/address/default">
              <input type="hidden" name="id" value="${addr.id}">
              <button class="btn">Set Default</button>
            </form>
            <form method="POST" action="/address/edit">
              <input type="hidden" name="id" value="${addr.id}">
              <button class="btn">Edit</button>
            </form>
          </div>
          <form method="POST" action="/address/edit" class="edit-address-form">
            <input type="hidden" name="id" value="${addr.id}">
            <input name="phone" value="${addr.phone}" required>
            <input name="address" value="${addr.address}" required>
            <input name="city" value="${addr.city}" required>
            <input name="country" value="${addr.country}" required>
            <button class="btn">Save</button>
          </form>
        </div>`
      )
    : `<p>No addresses found</p>`;

  return `
    <div class="container">
      <h1>Cart</h1>
      ${items}
      <hr>
      <section class="addresses">
        <h2>Select Delivery Address</h2>
        
        <form method="POST" action="/checkout" class="form checkout-form">
          ${addressList}
          <button class="btn primary" >Proceed to Checkout</button>
        </form>

        ${addresses.length < 3 ? `
          <h3>Add New Address</h3>
          <form method="POST" action="/address/add" class="form-addr">
            <input class="input" name="phone" placeholder="Phone" required />
            <input class="input" name="address" placeholder="Address" required>
            <input class="input" name="city" placeholder="City" required>
            <input class="input" name="country" placeholder="Country" required>
            <button class="btn">Add Address</button>
          </form>
        
          
        ` : `<p>Maximum 3 addresses reached</p>`}
      </section>
    </div>
  `;
}