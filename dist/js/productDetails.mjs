// src/js/ProductDetails.mjs
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    // fetch product details
    this.product = await this.dataSource.findProductById(this.productId);

    // render product details
    this.renderProductDetails();

    // attach Add to Cart listener
    const addBtn = document.getElementById("addToCart");
    if (addBtn) {
      addBtn.addEventListener("click", this.addProductToCart.bind(this));
    }
  }

  addProductToCart() {
    let cart = getLocalStorage("so-cart") || [];

    const productForCart = {
      ...this.product,
      FinalPrice: this.product.FinalPrice, // ya está en JSON
    };

    cart.push(productForCart);
    setLocalStorage("so-cart", cart);

    // redirect to cart page
    window.location.href = "../cart/index.html";
  }

  renderProductDetails() {
    if (!this.product) return;

    document.getElementById("productName").textContent = this.product.Name;
    document.getElementById("productDescription").innerHTML =
      this.product.DescriptionHtmlSimple || "";
    document.getElementById("productPrice").textContent = `$${this.product.FinalPrice}`;
    document.getElementById("productImage").src = this.product.Image;

    // Brand puede ser objeto o string
    const brand = typeof this.product.Brand === "object" ? this.product.Brand.Name : this.product.Brand;
    document.getElementById("productBrand").textContent = brand || "";

    // Colors es un array
    document.getElementById("productColor").textContent =
      this.product.Colors?.[0]?.ColorName || "";
  }
}
