// src/js/utils.mjs

// Save an object/value into localStorage as JSON
export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Read and parse JSON from localStorage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// Read a query string parameter
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Update the cart badge (#cart-count) based on items in localStorage("so-cart")
export function updateCartCount() {
  const cart = getLocalStorage("so-cart") || [];

  // If item.quantity is present use it; otherwise count as 1
  const count = cart.reduce((sum, item) => {
    const q = parseInt(item?.quantity ?? 1, 10);
    return sum + (Number.isFinite(q) && q > 0 ? q : 1);
  }, 0);

  const badge = document.querySelector("#cart-count");
  if (!badge) return;
  badge.textContent = count > 0 ? String(count) : "0";
}

/** Render a single template into a parent element, with optional callback */
export function renderWithTemplate(template, parentElement, data = null, callback = null) {
  if (!parentElement) return;
  parentElement.innerHTML = template;
  if (typeof callback === "function") {
    callback(parentElement, data);
  }
}

/** Get the /src/ root based on the current page path */
function getSrcRoot() {
  const path = window.location.pathname; // e.g. /wdd330new/src/product_pages/index.html
  const idx = path.indexOf("/src/");
  if (idx !== -1) return path.substring(0, idx + 5); // keep ".../src/"
  // fallback: assume /src/ at site root
  return "/src/";
}

/** Fetch an HTML file and return its text content */
export async function loadTemplate(path) {
  const res = await fetch(path, { credentials: "same-origin" });
  if (!res.ok) throw new Error(`Failed to load template: ${path} (${res.status})`);
  return await res.text();
}

/** Listen for cart changes so the badge keeps in sync across pages/tabs */
export function initCartCountWatchers() {
  // Updates when localStorage changes (this or another tab)
  window.addEventListener("storage", (e) => {
    if (e.key === "so-cart") updateCartCount();
  });
  // Custom event you can dispatch after add/remove to cart
  window.addEventListener("cart:updated", updateCartCount);
}

/** Load header.html and footer.html, then insert them into #main-header and #main-footer */
export async function loadHeaderFooter() {
  const base = `${getSrcRoot()}public/partials/`; // .../src/public/partials/
  const [headerHTML, footerHTML] = await Promise.all([
    loadTemplate(`${base}header.html`),
    loadTemplate(`${base}footer.html`)
  ]);

  const headerEl = document.getElementById("main-header");
  const footerEl = document.getElementById("main-footer");

  // Render header first, then update the cart count and start watchers
  renderWithTemplate(headerHTML, headerEl, null, () => {
    updateCartCount();         // now #cart-count exists → safe to update
    initCartCountWatchers();   // keep badge in sync after future cart changes
  });

  // Render footer (no callback needed)
  renderWithTemplate(footerHTML, footerEl);
}
