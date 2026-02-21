const KA_CONFIG = {
    tenantId: "d9afa355-7e61-4e3a-9cd3-6d9016b4b6bf",
    clientId: "84e1338e-1d58-464e-ae78-0bfc9d918b07",

    // Secret will be loaded locally
    clientSecret: null,

    drivePath: "/Apps/ACF Keeping Active Tracker",
    masterFile: "master.json",
    sessionFolder: "sessions",

    getSessionFilename: function () {
        const d = new Date();
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}.json`;
    }
};