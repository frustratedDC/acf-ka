/* ============================================================
   MICROSOFT GRAPH — AUTHENTICATION
============================================================ */

function authenticateWithMicrosoft() {
    const clientId = "YOUR_CLIENT_ID_HERE"; 
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