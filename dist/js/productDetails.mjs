import { getLocalStorage, setLocalStorage } from "../js/utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    const addBtn = document.getElementById("addToCart");
    if (addBtn) addBtn.addEventListener("click", this.addProductToCart.bind(this));

    // Display initial quantity on product page if needed
    this.updateProductQuantityDisplay();
  }

  addProductToCart() {
    const cart = getLocalStorage("so-cart") || [];
    const id = this.product.Id || this.product.id;

    // Check if product exists
    const existingIndex = cart.findIndex(item => item.Id === id);
    if (existingIndex > -1) {
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      cart.push({ ...this.product, quantity: 1, Id: id });
    }

    setLocalStorage("so-cart", cart);

    // Update the quantity display (live counter)
    this.updateProductQuantityDisplay();
  }

  updateProductQuantityDisplay() {
    const cart = getLocalStorage("so-cart") || [];
    const id = this.product.Id || this.product.id;
    const existing = cart.find(item => item.Id === id);
    const qty = existing ? existing.quantity : 0;

    const qtySpan = document.getElementById("cartCounter");
    if (qtySpan) qtySpan.textContent = qty;
  }

  renderProductDetails() {
    if (!this.product) return;

    document.getElementById("productName").textContent = this.product.Name;
    document.getElementById("productDescription").innerHTML = this.product.DescriptionHtmlSimple || "";
    document.getElementById("productPrice").textContent = `$${this.product.FinalPrice}`;
    document.getElementById("productImage").src = this.product.Image;

    const brand = typeof this.product.Brand === "object" ? this.product.Brand.Name : this.product.Brand;
    document.getElementById("productBrand").textContent = brand || "";

    document.getElementById("productColor").textContent = this.product.Colors?.[0]?.ColorName || "";

    // Make sure there is a span for quantity:
    // <span id="cartCounter">0</span>
  }
}
