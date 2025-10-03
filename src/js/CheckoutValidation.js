// CheckoutValidation.js
import CheckoutProcess from "./CheckoutProcess.mjs";

// petit helper d’alerte non-intrusif (Stretch W04)
function alertMessage(message, scroll = true) {
  const main = document.querySelector("main") || document.body;
  const box = document.createElement("div");
  box.setAttribute("role", "status");
  box.style.padding = "12px";
  box.style.margin = "0 0 12px 0";
  box.style.border = "1px solid #f0c36d";
  box.style.background = "#fff8e5";
  box.style.borderRadius = "8px";
  box.style.fontSize = "0.95rem";
  box.textContent = typeof message === "string" ? message : JSON.stringify(message);
  main.prepend(box);
  if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => box.remove(), 6000);
}

document.addEventListener("DOMContentLoaded", () => {
  // Instancie le process : clé du panier + sélecteur du bloc récap
  const process = new CheckoutProcess("so-cart", "main");
  process.init();               // calcule le subtotal
  process.calculateOrderTotal(); // complète tax/shipping/total

  const form = document.getElementById("checkout-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validation HTML5 (required, etc.)
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    try {
      // Lance le checkout (envoie payload au backend)
      const res = await process.checkout(form);

      // Succès : vider panier + aller à la page succès
      localStorage.removeItem("so-cart");
      // Adapte le chemin si ta page de succès est ailleurs
      window.location.href = "./checkout-success.html";
    } catch (err) {
      console.error("Checkout error:", err);
      // Affiche le détail d'erreur renvoyé par le serveur
      alertMessage(err?.message ?? "Checkout failed. Please verify your data.");
    }
  });
});