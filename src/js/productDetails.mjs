// src/js/ProductDetails.mjs
import { setLocalStorage, getLocalStorage, updateCartCount } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    // fetch product details
    this.product = await this.dataSource.findProductById(this.productId);
    console.log('[init] product:', this.product);

    // render product details
    this.renderProductDetails();

    // attach Add to Cart listener
    // Event delegation: fonctionne même si le bouton est re-render
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('#addToCart');
      if (!btn) return;
      e.preventDefault();
      console.log('[init] addToCart clicked (delegated)');
      this.addProductToCart();
    });
    console.log('[init] listener ready');
  }

  addProductToCart() {
    if (!this.product || !this.product.Id) {
      alert("Product not loaded");
      return;
    }
    const cart = getLocalStorage("so-cart") || [];

    // Build a minimal product object for the cart
    const productForCart = {
      Id: this.product.Id ?? this.product.id ?? this.product.SKU ?? this.product.Name,
      Name: this.product.Name,
      Image: this.product.Image,
      FinalPrice: this.product.FinalPrice,
      quantity: 1
    };

    // Check if the product already exists in the cart
    const existing = cart.find(p => p.Id === productForCart.Id);
    if (existing) {
      // If it exists, increase its quantity
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      // If not, add the product to the cart
      cart.push(productForCart);
    }

    // Save the updated cart back to localStorage
    setLocalStorage("so-cart", cart);

    // Update the cart count badge
    updateCartCount();

    // Redirect to the cart page
    window.location.href = new URL("../cart/index.html", window.location.href).href;
  }


  renderProductDetails() {
    if (!this.product) return;

    document.getElementById("productName").textContent = this.product.Name;
    document.getElementById("productDescription").innerHTML =
      this.product.DescriptionHtmlSimple || "";
    document.getElementById("productPrice").textContent = `$${this.product.FinalPrice}`;

    // ✅ Correction du chemin image
    const raw = this.product.Image || "";
    const imgPath = raw.startsWith("/src/") ? `../${raw.slice(5)}` : raw;

    const imgEl = document.getElementById("productImage");
    imgEl.src = imgPath;

    // Fallback si l'image n'est pas trouvée
    imgEl.onerror = () => { imgEl.src = "../images/placeholder.jpg"; };

    // Brand puede ser objeto o string
    const brand = typeof this.product.Brand === "object" ? this.product.Brand.Name : this.product.Brand;
    document.getElementById("productBrand").textContent = brand || "";

    // Colors es un array
    document.getElementById("productColor").textContent =
      this.product.Colors?.[0]?.ColorName || "";
  }
}
