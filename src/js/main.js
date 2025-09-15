import ProductData from "./productData.mjs";
import ProductDetails from "./productDetails.mjs";
import { updateCartBadge } from "./cartBadge.js";

const params = new URLSearchParams(window.location.search);
const productId = params.get("product");

if (productId) {
  const dataSource = new ProductData("../json/tents.json");
  const product = new ProductDetails(productId, dataSource);
  product.init();
} else {
  document.getElementById("productDetails").innerHTML =
    "<p>⚠️ No product selected</p>";
}

// actualiza el badge al cargar la página
updateCartBadge();