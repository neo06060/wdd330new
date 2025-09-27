import ExternalServices from "./ExternalServices.mjs";
export default ExternalServices;

export default class ProductData {
  constructor(jsonFile) {
    this.jsonFile = jsonFile;
  }

  async getData() {
    try {
      const response = await fetch(this.jsonFile);
      if (!response.ok) throw new Error("Error loading JSON");
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error fetching data:", err);
      return [];
    }
  }

  async findProductById(productId) {
    const data = await this.getData();
    return data.find((item) => item.Id === productId);
  }
}
