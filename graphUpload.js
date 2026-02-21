/* ============================================================
   MICROSOFT GRAPH — UPLOAD ENGINE
============================================================ */

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