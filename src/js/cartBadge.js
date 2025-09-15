export function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  const badge = document.querySelector("#cart-count");

  if (!badge) return;

  if (cart.length === 0) {
    badge.style.display = "none";
  } else {
    badge.style.display = "inline-block";
    badge.textContent = cart.length;
    badge.style.color = "white";
    badge.style.background = "red";
    badge.style.padding = "2px 6px";
    badge.style.borderRadius = "50%";
    badge.style.fontSize = "0.8rem";
    badge.style.fontWeight = "bold";
    badge.style.marginLeft = "4px";
  }
}
