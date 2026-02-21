async function uploadSession(sessionData) {
    const token = await getGraphToken();

    const filename = KA_CONFIG.getSessionFilename();

    // Upload session file
    const uploadUrl =
        `https://graph.microsoft.com/v1.0/me/drive/special/approot:/${KA_CONFIG.sessionFolder}/${filename}:/content`;

    await fetch(uploadUrl, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sessionData)
    });

    // Update master.json
    await updateMaster(sessionData, token);
}

async function updateMaster(sessionData, token) {
    const masterUrl =
        `https://graph.microsoft.com/v1.0/me/drive/special/approot:/${KA_CONFIG.masterFile}:/content`;

    // Download current master.json
    const response = await fetch(masterUrl, {
        headers: { "Authorization": `Bearer ${token}` }
    });

    let master = [];
    if (response.ok) {
        master = await response.json();
    }

    // Append new session
    master.push(sessionData);

    // Upload updated master.json
    await fetch(masterUrl, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(master)
    });
}