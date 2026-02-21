/* ============================================================
   MICROSOFT GRAPH — AUTH + UPLOAD
============================================================ */

/* ------------------------------------------------------------
   1. LOGIN + TOKEN HANDLING
------------------------------------------------------------ */
async function authenticateWithMicrosoft() {
    const clientId = "YOUR_CLIENT_ID_HERE";  // Replace with your Azure App Registration ID
    const redirectUri = window.location.origin + "/activation.html";
    const scopes = "Files.ReadWrite AppFolder";

    const authUrl =
        "https://login.microsoftonline.com/common/oauth2/v2.0/authorize" +
        "?client_id=" + clientId +
        "&response_type=token" +
        "&redirect_uri=" + encodeURIComponent(redirectUri) +
        "&scope=" + encodeURIComponent(scopes) +
        "&response_mode=fragment";

    window.location.href = authUrl;
}

/* ------------------------------------------------------------
   2. EXTRACT TOKEN FROM URL
------------------------------------------------------------ */
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

/* ------------------------------------------------------------
   3. UPLOAD SESSION HISTORY TO ONEDRIVE
------------------------------------------------------------ */
async function uploadSessionHistory() {
    try {
        const sessionHistory = JSON.parse(localStorage.getItem("sessionHistory")) || [];
        const accessToken = localStorage.getItem("graphAccessToken");

        if (!accessToken) {
            alert("Not authenticated. Please activate first.");
            return;
        }

        const jsonData = JSON.stringify(sessionHistory, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });

        const uploadPath = "/ACF-KeepingActive/master.json";

        const response = await fetch(
            "https://graph.microsoft.com/v1.0/me/drive/special/approot:/" +
            uploadPath +
            ":/content",
            {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
                body: blob
            }
        );

        if (!response.ok) {
            alert("Upload failed.");
            return;
        }

        alert("Session uploaded successfully.");
        localStorage.removeItem("current_session");
        window.location.href = "index.html";

    } catch (err) {
        alert("Upload error.");
    }
}

/* ------------------------------------------------------------
   4. AUTO‑RUN TOKEN EXTRACTION ON ACTIVATION PAGE
------------------------------------------------------------ */
if (window.location.pathname.endsWith("activation.html")) {
    extractAccessToken();
}