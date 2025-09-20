import { getLocalStorage, setLocalStorage } from "../js/utils.mjs";

// ---- Render cart ----
function renderCartContents() {
  const cart = getLocalStorage("so-cart") || [];
  const container = document.querySelector(".product-list");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  container.innerHTML = cart.map((item, i) => `
    <li class="cart-card divider">
      <span>${item.Name}</span>
      <button class="qty-down" data-index="${i}">-</button>
      <span id="qty-${i}">${item.quantity}</span>
      <button class="qty-up" data-index="${i}">+</button>
      <span>$${(item.FinalPrice * item.quantity).toFixed(2)}</span>
    </li>
  `).join("");

  // Attach click handlers
  container.querySelectorAll(".qty-up").forEach(btn =>
    btn.addEventListener("click", () => changeQuantity(parseInt(btn.dataset.index), 1))
  );
  container.querySelectorAll(".qty-down").forEach(btn =>
    btn.addEventListener("click", () => changeQuantity(parseInt(btn.dataset.index), -1))
  );
}

// ---- Change quantity ----
function changeQuantity(index, delta) {
  const cart = getLocalStorage("so-cart") || [];
  const item = cart[index];
  if (!item) return;

  item.quantity = Math.max((item.quantity || 1) + delta, 1);
  setLocalStorage("so-cart", cart);

  const qtySpan = document.getElementById(`qty-${index}`);
  if (qtySpan) qtySpan.textContent = item.quantity;

  // Update price display
  const listItem = qtySpan.parentElement;
  if (listItem) {
    const priceSpan = listItem.querySelector("span:last-child");
    if (priceSpan) priceSpan.textContent = `$${(item.FinalPrice * item.quantity).toFixed(2)}`;
  }
}

// ---- Clear cart ----
function clearCart() {
  localStorage.removeItem("so-cart");
  renderCartContents();

  // If you want to also reset the product page counters:
  const counter = document.getElementById("cartCounter");
  if (counter) counter.textContent = "0";
}

// ---- Initialize ----
document.addEventListener("DOMContentLoaded", () => {
  renderCartContents();

  const clearBtn = document.querySelector("#clearCart");
  if (clearBtn) clearBtn.addEventListener("click", clearCart);
});
