function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCounter();
}
function addToCart(product) {
  const cart = getCart();
  const item = cart.find(entry => entry.id === product.id);
  if (item) item.quantity += 1;
  else cart.push({id:product.id,name:product.name,price:Number(product.price),quantity:1});
  saveCart(cart);
}
function updateCartCounter() {
  const badge = document.querySelector(".cart-badge");
  if (badge) badge.textContent = getCart().reduce((sum,item)=>sum+item.quantity,0);
}
function changeQuantity(id, delta) {
  const cart = getCart();
  const item = cart.find(entry=>entry.id===id);
  if (item) item.quantity += delta;
  saveCart(cart.filter(entry=>entry.quantity>0));
  loadCart();
}
function loadCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;
  const cart = getCart();
  container.replaceChildren();
  let total = 0;
  if (!cart.length) {
    container.textContent = "Your cart is empty.";
  }
  cart.forEach(item => {
    total += item.price * item.quantity;
    const row = document.createElement("div");
    row.className = "cart-row";
    const name = document.createElement("strong");
    name.textContent = item.name;
    const price = document.createElement("span");
    price.textContent = `₹${item.price} × ${item.quantity}`;
    const controls = document.createElement("div");
    for (const [label,delta] of [["−",-1],["+ ",1]]) {
      const button = document.createElement("button");
      button.textContent = label;
      button.addEventListener("click",()=>changeQuantity(item.id,delta));
      controls.appendChild(button);
    }
    row.append(name,price,controls);
    container.appendChild(row);
  });
  document.getElementById("total-amount").textContent = total.toFixed(2);
}
async function checkout() {
  const cart = getCart();
  if (!cart.length) { alert("Your cart is empty."); return; }
  const userId = prompt("Enter your existing user ID to place this order:");
  if (!userId) return;
  const productQuantities = Object.fromEntries(cart.map(item=>[item.id,item.quantity]));
  const totalAmount = cart.reduce((sum,item)=>sum+item.price*item.quantity,0);
  try {
    const response = await fetch(`http://localhost:8080/orders/place/${encodeURIComponent(userId)}`, {
      method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({productQuantities,totalAmount})
    });
    if (!response.ok) throw new Error(`Order request failed (${response.status})`);
    localStorage.removeItem("cart");
    alert("Order placed successfully.");
    loadCart();
    updateCartCounter();
  } catch (error) {
    alert(error.message);
  }
}
document.addEventListener("DOMContentLoaded",()=>{loadCart();updateCartCounter();});