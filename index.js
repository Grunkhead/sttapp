const express = require('express');
const app = express();
const cors = require("cors");
const Index = require("./modules/indexer");

app.use(cors());

app.get('/evaluate*', async (req, res) => {
    try {
        const result = await Index(req.query.uri);
        if (result) res.json({ success: true, ...result });
        else throw new Error("Er ging iets fout tijdens het validatie process");
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
 
app.get('/*', express.static("build"));
 
app.listen(8080)