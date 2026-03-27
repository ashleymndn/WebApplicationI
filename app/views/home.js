export function homeView({ products, teaTypes = [], origins = [], sort = "" }) {
    const listProducts = products.map(product => `

        <div class="product">
            <img src="/assets/images/${product.image}" alt="${product.productName}">
            <div class="product-info">
                <br>
                <h3>${product.productName}</h3>
                <p>${product.price} AED</p>
                <br>
            

                <form class="add-product" method="POST" action="/cart">
                    <input type="hidden" name="productId" value="${product.productId}">
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
            <h2>Welcome to Rindo Tea!</h2>
            <h3>Explore our selection of teas,
            sourced from different tea farmers and artisans.</h3>
            <a href="/about"><button class="learn">Learn More</button></a>
            <img class="hero_img" src="/assets/images/bg1.webp">
        </div>

    <div class="shop-layout">
    <aside class="filters">
    <br>
    <h2>Filters</h2>

        <form method="GET" action="/shop">

            <h3>Tea Type</h3><br>
            <label><input type="checkbox" name="tea_type[]" value="1" ${teaTypes.includes(1) ? "checked" : ""}> Matcha</label><br>
            <label><input type="checkbox" name="tea_type[]" value="2" ${teaTypes.includes(2) ? "checked" : ""}> Green</label><br>
            <label><input type="checkbox" name="tea_type[]" value="3" ${teaTypes.includes(3) ? "checked" : ""}> Oolong</label><br>
            <label><input type="checkbox" name="tea_type[]" value="4" ${teaTypes.includes(4) ? "checked" : ""}> Herbal</label><br>
            <label><input type="checkbox" name="tea_type[]" value="5" ${teaTypes.includes(5) ? "checked" : ""}> White</label><br>
            <label><input type="checkbox" name="tea_type[]" value="6" ${teaTypes.includes(6) ? "checked" : ""}> Black</label><br>

            <h3>Origin</h3><br>
            <label><input type="checkbox" name="origin[]" value="1" ${origins.includes(1) ? "checked" : ""}> Japan</label><br>
            <label><input type="checkbox" name="origin[]" value="2" ${origins.includes(2) ? "checked" : ""}> China</label><br>
            <label><input type="checkbox" name="origin[]" value="3" ${origins.includes(3) ? "checked" : ""}> India</label><br>
            <label><input type="checkbox" name="origin[]" value="4" ${origins.includes(4) ? "checked" : ""}> Sri Lanka</label><br>
            <label><input type="checkbox" name="origin[]" value="5" ${origins.includes(5) ? "checked" : ""}> Taiwan</label><br>
            <label><input type="checkbox" name="origin[]" value="6" ${origins.includes(6) ? "checked" : ""}> South Africa</label><br>

            <h3>Sort By</h3><br>
            <select name="sort">
            <option value="">-- Select --</option>
            <option value="price_asc" ${sort === "price_asc" ? "selected" : ""}>Price: Low → High</option>
            <option value="price_desc" ${sort === "price_desc" ? "selected" : ""}>Price: High → Low</option>
            </select>

            <br>
            <button type="submit">Apply Filters</button>
        </form>
    </aside>

        <div class="products">
            <h1>Our Products</h1>

            <div class="product-grid">
                ${products.length === 0 
                    ? "<p>No products found.</p>" 
                    : listProducts}
            </div>
        </div>

    </div>

    </section>
        
    
    `;
}


