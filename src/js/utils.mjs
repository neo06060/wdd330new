// src/js/utils.mjs

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// NEW: get URL parameter
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// --- NEW: update cart badge ---
export function updateCartCount() {
  const cart = getLocalStorage("so-cart") || [];

  // Compte la quantité si dispo, sinon 1
  const count = cart.reduce((sum, item) => {
    const q = parseInt(item?.quantity ?? 1, 10);
    return sum + (Number.isFinite(q) && q > 0 ? q : 1);
  }, 0);

  const badge = document.querySelector("#cart-count");
  if (!badge) return;

  badge.textContent = count > 0 ? String(count) : "0";
}