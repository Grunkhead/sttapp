const express = require("express");
const app = express();

app.post("/api/validate/", async (req, res) => {
    try {
        res.json({ success: true });
    } catch (error) {
        res.status(503).json({ success: false, message: error.message });
    }
});

app.use("/", express.static("./public"));

app.listen(3003, () => console.log("app running on port 3003"));