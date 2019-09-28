const express = require('express');
const app = express();
const morgan = require("morgan");

// routes
const postRoutes = require("./routes/post");

// middleware
app.use(morgan("dev"));

app.use("/", postRoutes);

const port = 8080;
app.listen(8080, () => {
    console.log(`Server running on port ${port} ...`)
});