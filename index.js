const express = require('express')
const app = express()

app.get('/evaluate*', async (req, res) => {
    try {
        res.json({success:true, message:"OK"})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
 
app.get('/*', express.static("build"));
 
app.listen(8080)