/* ============================================================
   Activation Logic — Single Code: LEIGH26
   Secret is stored locally, never in GitHub
============================================================ */

function activateApp() {
    const code = document.getElementById("activationInput").value.trim();
    const status = document.getElementById("activationStatus");

    if (code !== "LEIGH26") {
        status.innerText = "Invalid activation code.";
        return;
    }

    // ⭐ PASTE YOUR REAL SECRET HERE ON YOUR PHONE ONLY
    const realSecret = "<PASTE_YOUR_SECRET_HERE>";

    // Store secret securely on device
    localStorage.setItem("ka_secret", realSecret);

    status.innerText = "Activated! Redirecting…";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
}

// Auto-redirect if already activated
document.addEventListener("DOMContentLoaded", () => {
    const existing = localStorage.getItem("ka_secret");
    if (existing) {
        window.location.href = "index.html";
    }
});