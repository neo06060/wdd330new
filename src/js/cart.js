import { getLocalStorage, setLocalStorage, updateCartCount, normalizeImageUrl } from "./utils.mjs";

const MONEY = (n) => `$${Number(n || 0).toFixed(2)}`;

function getCart() {
  return getLocalStorage("so-cart") || [];
}

function saveCart(cart) {
  setLocalStorage("so-cart", cart);
  updateCartCount();
  // synchronise les autres onglets et composants
  window.dispatchEvent(new Event("cart:updated"));
}

function lineTotal(item) {
  const unit = item?.FinalPrice ?? item?.Price ?? 0;
  const q = Number.parseInt(item?.quantity ?? 1, 10) || 1;
  return Number(unit) * q;
}

function cartTotal(cart) {
  return cart.reduce((sum, it) => sum + lineTotal(it), 0);
}

function renderCart() {
  const listEl = document.querySelector(".product-list");
  const emptyEl = document.querySelector(".cart-empty");
  const totalEl = document.querySelector(".cart-total .value");

  if (!listEl) return;

  const cart = getCart();
  listEl.innerHTML = "";

  if (cart.length === 0) {
    if (emptyEl) emptyEl.hidden = false;
    if (totalEl) totalEl.textContent = MONEY(0);
    return;
  }
  if (emptyEl) emptyEl.hidden = true;

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.className = "cart-card divider";
    li.dataset.id = item.Id;

    const color = item?.Colors?.[0]?.ColorName ?? "N/A";
    const qty = Number.parseInt(item?.quantity ?? 1, 10) || 1;
    const unit = item?.FinalPrice ?? item?.Price ?? 0;
    const img = normalizeImageUrl(item.Image || item.PrimaryMedium || item.PrimaryLarge || "");

    li.innerHTML = `
      <a class="cart-card__image">
        <img src="${img}" alt="${item.Name}"
             onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='320' height='240'><rect width='320' height='240' fill='#eee'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='#888'>No image</text></svg>`)}';" />
      </a>
      <a><h2 class="card__name">${item.Name}</h2></a>
      <p class="cart-card__color">${color}</p>
      <p class="cart-card__price">${MONEY(unit)}</p>
      <div class="cart-card__controls">
        <label>qty: <input type="number" class="qty" min="1" step="1" value="${qty}"></label>
        <button class="remove btn btn-link" type="button">Remove</button>
      </div>
    `;

    li.querySelector(".qty").addEventListener("change", (e) => {
      const newQty = Math.max(1, Number.parseInt(e.target.value, 10) || 1);
      const next = getCart();
      const idx = next.findIndex((it) => String(it.Id) === String(item.Id));
      if (idx > -1) {
        next[idx].quantity = newQty;
        saveCart(next);
        if (totalEl) totalEl.textContent = MONEY(cartTotal(next));
      }
    });

    li.querySelector(".remove").addEventListener("click", () => {
      const next = getCart().filter((it) => String(it.Id) !== String(item.Id));
      saveCart(next);
      renderCart();
    });

    listEl.appendChild(li);
  });

  if (totalEl) totalEl.textContent = MONEY(cartTotal(getCart()));
}

function clearCart() {
  saveCart([]);
  renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();

  const checkoutBtn = document.querySelector(".checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      const cart = getCart();
      if (!cart.length) {
        alert("Your cart is empty.");
        return;
      }
      const base = location.pathname.replace(/index\.html?$/i, "");
      location.href = `${base}checkout.html`;
    });
  }
  const clearBtn = document.querySelector("#clearCart");
  if (clearBtn) clearBtn.addEventListener("click", clearCart);
});