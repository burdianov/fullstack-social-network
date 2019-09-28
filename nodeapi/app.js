const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("Hello from node.js");
});

const port = 8080;
app.listen(8080, () => {
    console.log(`Server running on port ${port} ...`)
});