// Map product IDs to actual HTML filenames
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

  // JSON files for products
  const jsonFiles = [
    "./json/tents.json",
    "./json/backpacks.json",
    "./json/sleeping-bags.json"
  ];

  // Determine base path depending on environment
  const isLocalhost = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
  const basePath = isLocalhost ? "/src/product_pages/" : "/wdd330new/src/product_pages/";

  input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent form submission
      const query = input.value.trim();
      if (!query) return;

      try {
        // Load all JSON files
        const allProducts = await Promise.all(
          jsonFiles.map(file => fetch(file).then(res => res.json()))
        );

        const products = allProducts.flat();

        // Normalize query: lowercase and remove extra spaces
        const normalizedQuery = query.toLowerCase().replace(/\s+/g, " ").trim();

        // Fuzzy search: match if product name contains all words in query
        const matches = products.filter(p => {
          const name = (p.Name || "").toLowerCase();
          return normalizedQuery.split(" ").every(word => name.includes(word));
        });

        if (matches.length === 1) {
          const product = matches[0];
          const pageFile = productPageMap[product.Id];
          if (pageFile) {
            window.location.href = `${basePath}${pageFile}?product=${product.Id}`;
          } else {
            alert("No page found for that product.");
          }
        } else if (matches.length > 1) {
          alert(
            "Multiple products found:\n" +
            matches.map(p => `- ${p.Name}`).join("\n") +
            "\n\nPlease refine your search."
          );
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
