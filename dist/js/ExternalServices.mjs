// ExternalServices.mjs

export default class ExternalServices {
  constructor(jsonFile) {
    this.jsonFile = jsonFile;
  }

  // fetch product list (same as before)
  async getData() {
    try {
      const response = await fetch(this.jsonFile);
      if (!response.ok) throw new Error("Error loading JSON");
      return await response.json();
    } catch (err) {
      console.error("Error fetching data:", err);
      return [];
    }
  }

  // fetch a single product by Id
  async findProductById(productId) {
    const data = await this.getData();
    return data.find((item) => item.Id === productId);
  }

  // submit order to backend
  async checkout(payload) {
    const url = "http://wdd330-backend.onrender.com/checkout";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Checkout failed: ${response.statusText}`);
      }
      return await response.json();
    } catch (err) {
      console.error("Checkout error:", err);
      throw err;
    }
  }
}
