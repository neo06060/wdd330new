export async function loadHeaderFooter() {
    async function loadHTML (containerId, url) {
        const container = document.getElementById(containerId);
        try{
            const response = await fetch(url);
            if (!response.ok) throw new Error ('Failed to load' + url);
            container.innerHTML = await response.text();
        } catch (error) {
            console.error(error);
            container.innerHTML = '<p>Failed to load content</p>';
        }
    }

    await loadHTML('headercontainer', '../assets/header.html');
    await loadHTML('footercontainer', '../assets/footer.html');
}