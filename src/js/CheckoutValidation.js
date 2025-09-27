// checkoutValidation.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#checkout-form");
  const cart = JSON.parse(localStorage.getItem("so-cart") || "[]");

  // Display order summary
  const subtotal = cart.reduce((s, it) => s + ((it.FinalPrice ?? it.Price ?? 0) * (parseInt(it.quantity ?? 1, 10) || 1)), 0);
  const subEl = document.querySelector("#subtotal");
  const taxEl = document.querySelector("#tax");
  const shipEl = document.querySelector("#shipping");
  const totalEl = document.querySelector("#orderTotal");

  subEl.textContent = `$${subtotal.toFixed(2)}`;
  taxEl.textContent = `$${(subtotal*0.06).toFixed(2)}`;
  shipEl.textContent = `$${(cart.length>0?5:0).toFixed(2)}`;
  totalEl.textContent = `$${(subtotal*1.06 + (cart.length>0?5:0)).toFixed(2)}`;

  // Create message container
  const messageContainer = document.createElement("div");
  messageContainer.id = "checkout-message";
  messageContainer.style.marginTop = "1rem";
  form.parentNode.insertBefore(messageContainer, form.nextSibling);

  function showMessage(text, type="error") {
    messageContainer.textContent = text;
    messageContainer.style.color = type === "success" ? "green" : "red";
  }

  function validateForm() {
    const data = new FormData(form);
    const errors = [];
    const fname = data.get("fname").trim();
    const lname = data.get("lname").trim();
    const street = data.get("street").trim();
    const city = data.get("city").trim();
    const state = data.get("state").trim();
    const zip = data.get("zip").trim();
    const cardNumber = data.get("cardNumber").replace(/\s+/g, "");
    const expiration = data.get("expiration").trim();
    const code = data.get("code").trim();

    if(!fname) errors.push("First name is required.");
    if(!lname) errors.push("Last name is required.");
    if(!street) errors.push("Street is required.");
    if(!city) errors.push("City is required.");
    if(!state) errors.push("State is required.");
    if(!zip.match(/^\d{5}$/)) errors.push("Zip code must be 5 digits.");
    if(!cardNumber.match(/^\d{16}$/)) errors.push("Credit card number must be 16 digits.");
    if(!expiration.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) errors.push("Expiration must be MM/YY.");
    if(!code.match(/^\d{3,4}$/)) errors.push("Security code must be 3 or 4 digits.");

    return errors;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const errors = validateForm();
    if(errors.length > 0) {
      showMessage(errors.join(" "), "error");
      return;
    }

    // Prepare order data
    const data = new FormData(form);
    const orderData = {
      date: new Date().toLocaleString(),
      customer: {
        fname: data.get("fname").trim(),
        lname: data.get("lname").trim(),
        street: data.get("street").trim(),
        city: data.get("city").trim(),
        state: data.get("state").trim(),
        zip: data.get("zip").trim(),
        cardNumber: data.get("cardNumber").replace(/\s+/g, ""),
        expiration: data.get("expiration").trim(),
        code: data.get("code").trim()
      },
      items: cart,
      summary: {
        subtotal: parseFloat(subtotal.toFixed(2)),
        tax: parseFloat((subtotal*0.06).toFixed(2)),
        shipping: cart.length>0?5:0,
        total: parseFloat((subtotal*1.06 + (cart.length>0?5:0)).toFixed(2))
      }
    };

    // Save to sessionStorage for order confirmation
    sessionStorage.setItem("lastOrder", JSON.stringify(orderData));
    // Clear cart
    localStorage.removeItem("so-cart");
    // Redirect to confirmation page
    window.location.href = "../order/orderConfirmation.html";
  });
});
