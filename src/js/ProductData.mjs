const baseURL = import.meta.env.VITE_SERVER_URL;

const LOCAL_JSON = {
  tents: "/json/tents.json",
  "sleeping-bags": "/json/sleeping-bags.json",
  backpacks: "/json/backpacks.json",
  hammocks: "/json/hammocks.json",
};

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const data = await res.json();
  return Array.isArray(data) ? data : (data.Result ?? []);
}

export default class ProductData {
  constructor(category = null) {
    this.category = category;
  }

  async getData() {
    if (baseURL && this.category) {
      try {
        const list = await fetchJson(`${baseURL}products/search/${this.category}`);
        if (list.length) return list;
      } catch (e) {
        console.warn("[ProductData] API failed → fallback local:", e.message);
      }
    }
    const local = LOCAL_JSON[this.category];
    if (!local) return [];
    try {
      return await fetchJson(local);
    } catch (e) {
      console.error("[ProductData] Local JSON failed:", e);
      return [];
    }
  }

  async findProductById(id) {
    if (baseURL && id) {
      try {
        const listOrOne = await fetchJson(`${baseURL}product/${id}`);
        return Array.isArray(listOrOne) ? listOrOne[0] : listOrOne;
      } catch (e) {
        console.warn("[ProductData] API detail failed → fallback local:", e.message);
      }
    }
    if (!this.category) return null;
    const list = await this.getData();
    return list.find((p) => String(p.Id ?? p.id) === String(id)) ?? null;
  }
}