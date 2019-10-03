const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const dotenv = require('dotenv');
dotenv.config();

// db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connected");
});

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});

// routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({error: "Unauthorized!"});
    }
});

const port = process.env.PORT || 8080;
app.listen(8080, () => {
    console.log(`Server running on port ${port} ...`);
});