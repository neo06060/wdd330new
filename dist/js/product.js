// src/js/products.js
import { getParam } from "/dist/js/utils.mjs";
import ProductData from "/dist/js/ProductData.mjs";
import ProductDetails from "/dist/js/ProductDetails.mjs";

const productId = getParam("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();
