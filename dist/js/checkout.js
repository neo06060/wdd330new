// checkout.js
import CheckoutProcess from "../js/CheckoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

// calculate totals when zip is entered (demo: trigger on blur)
document.querySelector("input[name='zip']").addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});

// handle form submit
document.querySelector("#checkout-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const response = await checkout.checkout(e.target);
  console.log("Server response:", response);
  alert("Order placed successfully!");
});
