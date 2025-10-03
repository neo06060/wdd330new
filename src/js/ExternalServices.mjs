const BASE = "http://wdd330-backend.onrender.com";

async function convertToJson(res) {
  let json = {};
  try {
    json = await res.json();
  } catch {
    // pas de JSON -> on laisse {}
  }
  if (res.ok) return json;
  // Propage un objet avec détails (conforme W04)
  throw { name: "servicesError", message: json };
}

export default class ExternalServices {
  async checkout(payload) {
    const url = `${BASE}/checkout`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return convertToJson(response);
  }
}