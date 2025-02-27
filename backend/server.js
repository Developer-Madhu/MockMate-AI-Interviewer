const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require("cors");
const app = express();
app.use(cors({
  origin: "http://localhost:5173", // Allow requests from this origin
  credentials: true
}));
const { GoogleGenerativeAI } = require('@google/generative-ai');

app.use(express.json());
app.use(cors());

const users = [];
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

const genAI = new GoogleGenerativeAI("AIzaSyBLvHRUeAQ7lOZeTpDC8BZcOlOeIncBfto");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/interview', async (req, res) => {
  const { prompt, answer } = req.body;

  if (answer) {
    const feedbackPrompt = `Evaluate the following answer and provide feedback in a structured bullet-point format. Focus on end/final answer rather than complete context or steps & Identify mistakes and highlight their categories in bold (use *text* format). Provide short, precise corrections for each mistake in bullet points. Avoid long paragraphs—use concise and actionable feedback:\n
    Question: ${prompt}\n
    Answer: ${answer}\n
    Feedback:`;

    try { 
      const feedbackResult = await model.generateContent(feedbackPrompt);
      return res.json({ feedback: feedbackResult.response.text() }); // Send feedback
    } catch (error) {
      console.error("Error analyzing the answer:", error);
      return res.status(500).json({ error: "Error analyzing answer" });
    }
  }

    const mainprompt = `Generate 1 question about ${prompt} by directly asking questions without responding any other as this should be considered as practice for attending interview `
    if (!mainprompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }
    try {
      const result = await model.generateContent(mainprompt);
      res.json({ response: result.response.text() }); // Send back the text
    } catch (error) {
      console.error("Error generating content:", error);
      res.status(500).json({ error: 'Error generating content' });
    }
})
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
  res.json({ token, user });
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