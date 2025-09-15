// src/js/products.js
import { getParam } from "../js/utils.mjs";
import ProductData from "../js/ProductData.mjs";
import ProductDetails from "../js/productDetails.mjs";

const productId = getParam("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();
