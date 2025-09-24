// src/js/products.js
import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./productDetails.mjs";

const productId = getParam("product");
const dataSource = new ProductData("../json/tents.json");

const product = new ProductDetails(productId, dataSource);
product.init();
