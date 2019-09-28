const express = require('express');
const app = express();
const morgan = require("morgan");

// routes
const {getPosts} = require("./routes/post");

// middleware
app.use(morgan("dev"));

app.get("/", getPosts);

const port = 8080;
app.listen(8080, () => {
    console.log(`Server running on port ${port} ...`)
});