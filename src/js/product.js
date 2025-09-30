import { getParam, normalizeImageUrl } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./productDetails.mjs";

const productId = getParam("product");
// catégorie par défaut → "tents"
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource, normalizeImageUrl);
product.init();