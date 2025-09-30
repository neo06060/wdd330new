export async function loadHeaderFooter() {
    async function loadHTML(containerId, url) {
        const container = document.getElementById(containerId);
        if (!container) return; // page sans conteneur → on ignore
        try {
            let res = await fetch(url);            // absolu (Vite: /assets/…)
            if (!res.ok) {
                const fallback = url.replace(/^\//, "./"); // relatif si besoin
                res = await fetch(fallback);
            }
            if (!res.ok) throw new Error(`Failed to load ${url}`);
            container.innerHTML = await res.text();
        } catch (err) {
            console.error(err);
            container.innerHTML = `<p style="color:#b00;">Failed to load ${url}</p>`;
        }
    }

    await Promise.all([
        loadHTML("headercontainer", "/assets/header.html"),
        loadHTML("footercontainer", "/assets/footer.html"),
    ]);
}