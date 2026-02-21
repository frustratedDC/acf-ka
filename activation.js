/* ============================================================
   MICROSOFT GRAPH — AUTHENTICATION
============================================================ */

function authenticateWithMicrosoft() {
    const clientId = "84e1338e-1d58-464e-ae78-0bfc9d918b07"; 
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