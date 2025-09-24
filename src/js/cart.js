import { getLocalStorage, updateCartCount } from "./utils.mjs";

// convert "/src/..." -> "../..."
function normalizeImg(path) {
  if (!path) return "../images/placeholder.jpg";
  return path.startsWith("/src/") ? `../${path.slice(5)}` : path;
}

function cartItemTemplate(item) {
  const color = item.Colors?.[0]?.ColorName || "N/A";
  const qty = item.quantity || 1;

  return `
  <li class="cart-card divider">
    <a class="cart-card__image">
      <img src="${normalizeImg(item.Image)}" alt="${item.Name}" />
    </a>
    <a><h2 class="card__name">${item.Name}</h2></a>
    <p class="cart-card__color">${color}</p>
    <p class="cart-card__quantity">qty: ${qty}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  document.querySelector(".product-list").innerHTML =
    cartItems.map(cartItemTemplate).join("");
}

function clearCart() {
  localStorage.removeItem("so-cart");
  updateCartCount();
  location.reload();
}

// init
document.addEventListener("DOMContentLoaded", () => {
  renderCartContents();
  updateCartCount();

  const clearBtn = document.querySelector("#clearCart");
  if (clearBtn) clearBtn.addEventListener("click", clearCart);
  else console.warn("⚠️ #clearCart not found in the DOM");
});
