import { loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        await loadHeaderFooter();
    } catch (err) {
        console.error("Header/Footer load error:", err);
    }
});