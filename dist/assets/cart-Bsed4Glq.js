import { g as t } from "../assets/utils-DTA1AWa-.js";
/* empty css */

// ---- render cart contents ----
function renderCartContents() {
  const cart = t("so-cart") || [];
  const counters = JSON.parse(localStorage.getItem("so-cart-counter") || "{}");

  const html = cart.map((item) => {
    const id = item.Id || item.id;
    const qty = counters[id] || item.quantity || 1; // fallback to item.quantity if counter not set
    const totalPrice = (item.FinalPrice * qty).toFixed(2);

    return `<li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "N/A"}</p>
      <p class="cart-card__quantity">qty: ${qty}</p>
      <p class="cart-card__price">$${totalPrice}</p>
    </li>`;
  });

  document.querySelector(".product-list").innerHTML = html.join("");
}

// ---- clear cart ----
function clearCart() {
  localStorage.removeItem("so-cart");          // clear cart
  localStorage.removeItem("so-cart-counter");  // reset counters
  location.reload();
}

// ---- hook clear button ----
document.addEventListener("DOMContentLoaded", () => {
  renderCartContents();

  const clearBtn = document.getElementById("clearCart");
  if (clearBtn) clearBtn.addEventListener("click", clearCart);
});
