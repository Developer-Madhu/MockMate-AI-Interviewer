const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config()
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const users = []; 
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

// Register Route
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.json({ message: "User registered successfully" });
    console.log("User registered successfully")
});

// Login Route
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
});

// Middleware for protected routes
function authenticateToken(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(403).json({ message: "Access denied" });
    jwt.verify(token.split(" ")[1], SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
}

// Protected Route
app.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "Welcome to the protected route", user: req.user });
});

app.listen(3000, () => console.log("Server running on port 3000"));