const BASE_URL = "http://localhost:8080";

async function loadProducts() {
  const message = document.getElementById("load-message");
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) throw new Error(`API returned ${response.status}`);
    const products = await response.json();
    message.textContent = products.length ? "" : "No products found. Add products using POST /products.";
    const groups = {
      trending: document.getElementById("trending-products"),
      clothing: document.getElementById("clothing-products"),
      electronics: document.getElementById("electronics-products")
    };
    products.forEach(product => {
      const card = document.createElement("article");
      card.className = "product-card";
      const title = document.createElement("h3");
      title.textContent = product.name;
      const description = document.createElement("p");
      description.textContent = product.description || "";
      const price = document.createElement("p");
      price.className = "price";
      price.textContent = `₹${product.price}`;
      const button = document.createElement("button");
      button.className = "button";
      button.textContent = "Add to cart";
      button.addEventListener("click", () => addToCart(product));
      card.append(title, description, price, button);
      const category = (product.category || "").toLowerCase();
      const target = category === "clothing" ? groups.clothing :
        category === "electronics" ? groups.electronics : groups.trending;
      target.appendChild(card);
    });
  } catch (error) {
    message.textContent = "Could not load products. Check that the Spring Boot API and MySQL are running.";
    console.error("Error loading products:", error);
  }
}