const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require("cors");
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());
app.use(cors());

const users = []; 
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

const genAI = new GoogleGenerativeAI("AIzaSyBLvHRUeAQ7lOZeTpDC8BZcOlOeIncBfto");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/interview', async (req, res) => { 
  const { prompt } = req.body; 

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const result = await model.generateContent(prompt);
    res.json({ response: result.response.text() }); // Send back the text
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: 'Error generating content' });
  }
});
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