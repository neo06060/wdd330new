// Map product IDs to the actual HTML filenames
const productPageMap = {
  "985RF": "northface-talus-4.html",
  "989CG": "northface-talus-3.html",
  "985PR": "northface-alpine-3.html",
  "880RR": "marmot-ajax-3.html",
  "880RT": "marmot-ajax-2.html",
  "344YJ": "cedar-ridge-rimrock-2.html"
  // add more as needed
};

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("navbarSearch");
  if (!input) return;

  const jsonFiles = [
    "./json/tents.json",
    "./json/backpacks.json",
    "./json/sleeping-bags.json"

  ];

  input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const query = input.value.trim();
      if (!query) return;

      try {
        const allProducts = await Promise.all(
          jsonFiles.map(file => fetch(file).then(res => res.json()))
        );
        const products = allProducts.flat();

        // fuzzy search (only needs part of the name)
        const product = products.find(p =>
          p.Name.toLowerCase().includes(query.toLowerCase())
        );

        if (product) {
          const pageFile = productPageMap[product.Id];
          if (pageFile) {
            window.location.href = `/src/product_pages/${pageFile}?product=${product.Id}`;
          } else {
            alert("No page found for that product.");
          }
        } else {
          alert("No product matches your search.");
        }
      } catch (err) {
        console.error("Search error:", err);
        alert("Error searching for product.");
      }
    }
  });
});
