import ProductData from "./ProductData.mjs";
import ProductDetails from "./productDetails.mjs";

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
