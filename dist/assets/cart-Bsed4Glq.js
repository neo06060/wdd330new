import { g as t } from "../assets/utils-DTA1AWa-.js";
/* empty css              */

function e() {
  const r = (t("so-cart") || []).map((c) => s(c));
  document.querySelector(".product-list").innerHTML = r.join("");
}

function s(a) {
  return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${a.Image}"
      alt="${a.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${a.Name}</h2>
  </a>
  <p class="cart-card__color">${a.Colors?.[0]?.ColorName || "N/A"}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${a.FinalPrice}</p>
</li>`;
}

// render contents
e();

// ✅ clear cart logic
function clearCart() {
  localStorage.removeItem("so-cart"); // elimina el carrito
  location.reload(); // refresca la página
}

// ✅ hook button after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const clearBtn = document.getElementById("clearCart");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearCart);
  } else {
    console.warn("⚠️ clearCart button not found in DOM");
  }
});
