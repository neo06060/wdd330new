import ProductData from "./ProductData.mjs";
import { getParam, normalizeImageUrl } from "./utils.mjs";
import { loadHeaderFooter } from "./loadHeaderFooter.js";

await loadHeaderFooter();

const category = getParam("category") || "tents";
const dataSource = new ProductData(category);
const listElement = document.querySelector(".product-list");
const titleEl = document.querySelector(".category-title");

function niceName(cat) {
    return cat.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// Fallback image inline (aucun réseau requis)
const FALLBACK_SVG =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='240' viewBox='0 0 320 240'>
      <rect width='320' height='240' fill='#eee'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
            font-family='Arial,Helvetica,sans-serif' font-size='18' fill='#888'>
        No image
      </text>
    </svg>`
    );

// Redirige les 4 tentes vers tes pages statiques existantes
const knownPages = {
    "880RR": "marmot-ajax-3.html",
    "985RF": "northface-alpine-3.html",
    "344YJ": "northface-talus-4.html",
    "410JX": "cedar-ridge-rimrock-2.html",
};

function imageUrl(product) {
    const raw = product?.PrimaryMedium || product?.PrimaryLarge || product?.Image || "";
    return normalizeImageUrl(raw) || FALLBACK_SVG;
}

function productTemplate(product) {
    const page = knownPages[String(product.Id)] ?? "marmot-ajax-3.html"; // fallback neutre
    const url = `../product_pages/${page}?product=${product.Id}`;

    const img = imageUrl(product);
    const price =
        (product.FinalPrice && product.FinalPrice.toFixed
            ? product.FinalPrice.toFixed(2)
            : product.ListPrice) ?? "";

    return `
    <li class="product-card" style="list-style:none;">
      <a href="${url}" class="product-card__image" style="display:block;">
        <img src="${img}" alt="${product.Name}"
             onerror="this.onerror=null;this.src='${FALLBACK_SVG}';"
             style="max-width:100%;height:auto;display:block;">
      </a>
      <h2 class="card__name">${product.Name}</h2>
      <p class="card__price">${price ? `$${price}` : ""}</p>
    </li>`;
}

async function renderList() {
    try {
        const products = await dataSource.getData();
        listElement.innerHTML = (products && products.length)
            ? products.map(productTemplate).join("")
            : `<li style="list-style:none;margin:1rem 0;"><em>No products found for "${niceName(category)}".</em></li>`;
    } catch (e) {
        console.error(e);
        listElement.innerHTML =
            `<li style="list-style:none;margin:1rem 0;color:#b00;"><strong>Error:</strong> unable to load products.</li>`;
    } finally {
        if (titleEl) titleEl.textContent = `Top Products: ${niceName(category)}`;
    }
}

renderList();