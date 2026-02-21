/* ============================================================
   MICROSOFT GRAPH — TOKEN EXTRACTION
============================================================ */

function extractAccessToken() {
    if (window.location.hash.includes("access_token")) {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const token = params.get("access_token");

        if (token) {
            localStorage.setItem("graphAccessToken", token);
            alert("Microsoft Graph activated successfully.");
            window.location.href = "index.html";
        }
    }
}

if (window.location.pathname.endsWith("activation.html")) {
    extractAccessToken();
}