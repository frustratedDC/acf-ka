/* ============================================================
   ACF Keeping Active Tracker — Cloud Upload Engine
   Requires:
   - config.js (KA_CONFIG)
   - graphAuth.js (getGraphToken)
============================================================ */

async function uploadSessionFile(sessionData) {
    const token = await getGraphToken();

    const filename = KA_CONFIG.getSessionFilename();
    const uploadPath = `${KA_CONFIG.drivePath}/${KA_CONFIG.sessionFolder}/${filename}`;

    const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/special/approot:/${KA_CONFIG.sessionFolder}/${filename}:/content`;

    const response = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sessionData)
    });

    if (!response.ok) {
        console.error("❌ Session upload failed:", await response.text());
        throw new Error("Session upload failed");
    }

    console.log("✅ Session uploaded:", filename);
    return true;
}

async function downloadMasterFile() {
    const token = await getGraphToken();

    const url = `https://graph.microsoft.com/v1.0/me/drive/special/approot:/${KA_CONFIG.masterFile}:/content`;

    const response = await fetch(url, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    });

    if (response.status === 404) {
        console.warn("⚠️ No master.json found — creating new one");
        return { cadets: [], totals: {}, bests: {}, logbook: [] };
    }

    if (!response.ok) {
        console.error("❌ Failed to download master.json:", await response.text());
        throw new Error("Master download failed");
    }

    return await response.json();
}

async function uploadMasterFile(masterData) {
    const token = await getGraphToken();

    const url = `https://graph.microsoft.com/v1.0/me/drive/special/approot:/${KA_CONFIG.masterFile}:/content`;

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(masterData)
    });

    if (!response.ok) {
        console.error("❌ Failed to upload master.json:", await response.text());
        throw new Error("Master upload failed");
    }

    console.log("✅ master.json updated");
    return true;
}

async function syncToCloud(sessionData) {
    console.log("🔄 Sync started…");

    // 1. Upload session file
    await uploadSessionFile(sessionData);

    // 2. Download master.json
    const master = await downloadMasterFile();

    // 3. Update totals, bests, logbook index
    master.logbook.push({
        date: sessionData.date,
        detachment: sessionData.detachment,
        cadets: sessionData.cadets.length
    });

    // (You can expand this later with totals, bests, etc.)

    // 4. Upload updated master.json
    await uploadMasterFile(master);

    console.log("🎉 Sync complete");
    return true;
}