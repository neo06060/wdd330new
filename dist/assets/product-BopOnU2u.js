import { setLocalStorage as n } from "./utils-DTA1AWa-.js";

function handleFetchResponse(res) {
    if(res.ok) return res.json();
    throw new Error("Bad Response");
}

class ProductData {
    constructor(category){
        this.category = category;
        this.path = `../json/${category}.json`;
    }
    getData() {
        return fetch(this.path)
            .then(handleFetchResponse)
            .then(data => data);
    }
    async findProductById(id) {
        const data = await this.getData();
        return data.find(item => item.Id === id);
    }
}

const dataSource = new ProductData("tents");

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
    cart.push(product);
    localStorage.setItem("so-cart", JSON.stringify(cart));
    alert(`${product.Name} added to cart!`);
}

async function handleClick(event) {
    const id = event.currentTarget.dataset.id;
    const product = await dataSource.findProductById(id);
    addToCart(product);
}

// Wait for DOM to load
window.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("addToCart");
    if(btn){
        btn.addEventListener("click", handleClick);
    }
});
