// src/js/products.js
import { getParam } from "./utils.mjs";
import ProductData from "./productData.mjs";
import ProductDetails from "./productDetails.mjs";

const productId = getParam("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();
