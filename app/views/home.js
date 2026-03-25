export function homeView({ products }) {
    const listProducts = products.map(products => `

        <div class="product">
            <img src="/assets/images/${products.image}" alt="${products.productName}">
            <div class="product-info">
                <br>
                <h3>${products.productName}</h3>
                <p>${products.price} AED</p>
                <br>
            

                <form class="add-product" method="POST" action="/cart">
                    <input type="hidden" name="productId" value="${products.productId}">
                    <div class="buttoncontainer">
                        <button type="submit" class="addtocart">Add to Cart</button>
                    </div>
                </form>
                
            </div>
        </div>

    `).join("");

    return `
    <section aria-labelledby="home-heading">

        <div class="container-footer">
            <h3>Explore our selection of teas,
            sourced from different tea farmers and artisans.</h3>
            <img class="hero_img" src="/assets/images/bg1.webp">
        </div>


        <section class="shop-layout">

        <aside class="filters">
            <br>
            <h3>Filters</h3>
            <br>
            <h3>Tea Type</h3>
            <label><input type="checkbox"> Matcha</label><br>
            <label><input type="checkbox"> Oolong</label><br>
            <label><input type="checkbox"> Herbal</label><br>
            <label><input type="checkbox"> Green</label><br>
            <label><input type="checkbox"> White</label><br>

            <h3>Origin</h3>
            <label><input type="checkbox"> China</label><br>
            <label><input type="checkbox"> India</label><br>
            <label><input type="checkbox"> Japan</label><br>
            <label><input type="checkbox"> South Africa</label><br>
            <label><input type="checkbox"> Sri Lanka</label>
        </aside>

        <div class="products">
            <h1>Our Products</h1>
            <div class="product-grid">
                ${listProducts}
            </div>
        </div>

    </section>
        
    
    `;
}


