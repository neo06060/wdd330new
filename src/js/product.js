// src/js/products.js
import { getParam } from "/wdd330new/src/js/utils.mjs";
import ProductData from "/wdd330new/src/js/ProductData.mjs";
import ProductDetails from "/wdd330new/src/js/ProductDetails.mjs";

const productId = getParam("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();
