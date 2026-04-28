const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

/* MIDDLEWARE */
app.use(express.json());
app.use(cors());

//mongo connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch((err) => console.log(err));

//path for API routes
app.use("/api/auth", require("./routes/auth"));

//frontend code
app.use(express.static(path.join(__dirname, "../frontend")));

//page routing
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/register.html"));
});

app.get("/login.html", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

app.get("/mediator.html", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/mediator.html"));
});

app.get("/customer.html", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/customer.html"));
});
//server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} 🚀`);
});