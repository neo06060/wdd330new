import { getLocalStorage } from "/wdd330new/src/js/utils.mjs";

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

// ---- inicializa el carrito ----
renderCartContents();

// ---- clear cart ----
function clearCart() {
  localStorage.removeItem("so-cart"); // elimina datos del carrito
  location.reload(); // refresca la página
}

// ---- enganchar el evento cuando el DOM ya está listo ----
document.addEventListener("DOMContentLoaded", () => {
  const clearBtn = document.querySelector("#clearCart");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearCart);
  } else {
    console.warn("⚠️ No se encontró el botón #clearCart en el DOM");
  }
});
