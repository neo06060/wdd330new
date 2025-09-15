import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./productData.mjs";
import { updateCartBadge } from "./cartBadge.js";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const color = item.Colors?.[0]?.ColorName || "N/A";

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${color}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}
renderCartContents();

export async function addProductToCart(productId) {
  try {
    const dataSource = new ProductData("../json/tents.json");
    const product = await dataSource.findProductById(productId);

    if (!product) {
      console.error("Product not found");
      return;
    }
    const cart = getLocalStorage("so-cart") || [];
    cart.push(product);
    setLocalStorage("so-cart", cart);
    alert(`${product.Name} Product added to cart  🛒`);
  } catch (err) {
    console.error("Error adding product to cart:", err);
  }
}
// ---- clear cart ----
function clearCart() {
  localStorage.removeItem("so-cart"); 
  renderCartContents();
  updateCartBadge();
}
document.addEventListener("DOMContentLoaded", () => {
  const clearBtn = document.querySelector("#clearCart");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearCart);
  } else {
    console.warn("⚠️ No se encontró el botón #clearCart en el DOM");
  }
});
