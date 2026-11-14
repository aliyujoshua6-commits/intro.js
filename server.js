require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
});

app.use(express.static(path.join(__dirname, "PUBLIC")));

app.get("/user", (req, res) => {
    res.json({ message: "GET /user works!", user: [] });
});
app.get("/user/:id", (req, res) => {
    res.send(`user ${req.params.id} profile`);
});

app.post("/user", (req, res) => {
    const { name, email} = req.body;

    if (!name || !email) {
        return res.status(400).json ({ error: "name and email are required" });
    }

    res.send(`hello, ${name}!`);
});

app.use((req, res) => {
    res.status(404).send("page not found : (");
});

app.use ((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "something went wrong!"});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API live on port ${PORT}`);
});