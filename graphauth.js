/* ============================================================
   Microsoft Graph Authentication
   Uses client credentials stored in localStorage
============================================================ */

async function getGraphToken() {

    // Load secret from activation
    KA_CONFIG.clientSecret = localStorage.getItem("ka_secret");

    if (!KA_CONFIG.clientSecret) {
        throw new Error("App not activated — no secret found.");
    }

    const url = `https://login.microsoftonline.com/${KA_CONFIG.tenantId}/oauth2/v2.0/token`;

    const params = new URLSearchParams();
    params.append("client_id", KA_CONFIG.clientId);
    params.append("scope", "https://graph.microsoft.com/.default");
    params.append("client_secret", KA_CONFIG.clientSecret);
    params.append("grant_type", "client_credentials");

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    if (!response.ok) {
        console.error("❌ Failed to get Graph token", await response.text());
        throw new Error("Graph authentication failed");
    }

    const data = await response.json();
    return data.access_token;
}