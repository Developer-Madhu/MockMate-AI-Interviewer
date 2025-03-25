// const express = require("express");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const bodyParser = require('body-parser')
// require('dotenv').config()
// const cors = require("cors");
// const app = express();
// app.use(cors({
//     origin: "http://localhost:5173", // Allow requests from this origin
//     credentials: true
// }));
// const { GoogleGenerativeAI } = require('@google/generative-ai');

// app.use(express.json());
// app.use(cors());

const users = [];
// const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";



// const HRPrompt = `
// You are an AI assistant with START, PLAN, ACTION, OBSERVATION, and OUTPUT states. 
// User: Give me 5 questions on HR topics so that I can prepare for my interview from basic to advanced level.
// PLAN: I will call the processResponse function to generate a question based on the topic.
// ACTION: Call processResponse with input "HR".
// OBSERVATION: ${processResponse("HR")}
// OUTPUT: What are your strengths and weaknesses? 
// `;

// const genAI = new GoogleGenerativeAI("AIzaSyBLvHRUeAQ7lOZeTpDC8BZcOlOeIncBfto");
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// function processResponse(ques = '') {
//     if (ques == "Aptitude") {
//         return 'This is a question on aptitude'
//     }
// }   

// app.post('/interview', async (req, res) => {
//     const { prompt, answer } = req.body;

//     if (answer) {
//         const feedbackPrompt = `Evaluate the following answer and provide feedback in a structured bullet-point format. Focus on end/final answer rather than complete context or steps & Identify mistakes and highlight their categories in bold (use *text* format). Provide short, precise corrections for each mistake in bullet points. Avoid long paragraphs—use concise and actionable feedback:\n
//     Question: ${prompt}\n
//     Answer: ${answer}\n
//     Feedback:`;

//         try {
//             const feedbackResult = await model.generateContent(feedbackPrompt);
//             return res.json({ feedback: feedbackResult.response.text() }); // Send feedback
//         } catch (error) {
//             console.error("Error analyzing the answer:", error);
//             return res.status(500).json({ error: "Error analyzing answer" });
//         }
//     }

//     if (prompt == 'Aptitude') { }
//     const AptitudePrompt = `
//     You are an AI assistant with START, PLAN, ACTION, OBSERVATION, and OUTPUT states. 
//     User: Give me a question on Aptitude so that I can prepare for my interview from basic to advanced level.
//     PLAN: I will call the processResponse function to generate a question based on the topic.
//     ACTION: Call processResponse with input "Aptitude".
//     OBSERVATION: ${processResponse("Aptitude")}
//     OUTPUT: A train is running 100 miles per hour, what is its average speed? 
// `;
//     // const mainprompt = `Generate 1 question about ${prompt} by directly asking questions without responding any other as this should be considered as practice for attending interview `

//     if (!AptitudePrompt) {
//         return res.status(400).json({ error: "Prompt is required" });
//     }
//     try {
//         const result = await model.generateContent(AptitudePrompt);
//         res.json({ response: result.response.text() }); // Send back the text
//     } catch (error) {
//         console.error("Error generating content:", error);
//         res.status(500).json({ error: 'Error generating content' });
//     }

// })
// // Register Route
// app.post("/register", async (req, res) => {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     users.push({ username, password: hashedPassword });
//     res.json({ message: "User registered successfully" });
//     console.log("User registered successfully")
// });

// // Login Route
// app.post("/login", async (req, res) => {
//     const { username, password } = req.body;
//     const user = users.find(u => u.username === username);
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//         return res.status(401).json({ message: "Invalid credentials" });
//     }
//     const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
//     res.json({ token, user });
// });

// // Middleware for protected routes
// function authenticateToken(req, res, next) {
//     const token = req.header("Authorization");
//     if (!token) return res.status(403).json({ message: "Access denied" });
//     jwt.verify(token.split(" ")[1], SECRET_KEY, (err, user) => {
//         if (err) return res.status(403).json({ message: "Invalid token" });
//         req.user = user;
//         next();
//     });
// }

// // Protected Route
// app.get("/protected", authenticateToken, (req, res) => {
//     res.json({ message: "Welcome to the protected route", user: req.user });
// });

// app.listen(3000, () => console.log("Server running on port 3000"));
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser');
const ConnectDB = require('./database/database.js')
const userModel = require('./models/userModel.js')
require('dotenv').config();
const cors = require("cors");
const Question = require('./models/questions.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());

ConnectDB()
    .catch((err) => {
        console.log("MongoDB Conn error !")
    })

const genAI = new GoogleGenerativeAI("AIzaSyBLvHRUeAQ7lOZeTpDC8BZcOlOeIncBfto");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

class GeminiAgent {
    constructor(apiKey, modelName = "gemini-1.5-flash") {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: modelName });
    }

    async generateResponse(prompt) {
        try {
            const result = await this.model.generateContent(prompt);
            return result.response.text();
        } catch (error) {
            console.error("Error generating response:", error);
            return "Sorry, I encountered an error. Please try again.";
        }
    }

    async processInput(input) {
        return await this.generateResponse(input);
    }
}
async function generateQuestionWithAnswer(prompt) {
    const agent = new GeminiAgent("AIzaSyBLvHRUeAQ7lOZeTpDC8BZcOlOeIncBfto");
    const mainprompt = `
        You are an AI assistant designed to generate interview questions with corresponding answers.
        Generate a question about ${prompt} that is suitable for interview practice.
        Provide the question and the correct answer in JSON format.
        Example:
        {
            "question": "What is the capital of France?",
            "answer": "Paris"
        }
    `;

    try {
        const response = await agent.processInput(mainprompt);
        return JSON.parse(response);
    } catch (error) {
        console.error("Error generating question with answer:", error);
        return { error: 'Failed to generate question with answer.' };
    }
}
function processResponse(ques = '') {
    if (ques === "Aptitude") {
        return 'This is a question on aptitude';
    } else if (ques === "HR") {
        return 'This is a question on HR';
    } else if (ques === "Technical") {
        return 'This is a question on Technical';
    } else {
        return 'Topic not recognized';
    }
}

app.post('/interview', async (req, res) => {
    const { prompt, answer } = req.body;
    const agent = new GeminiAgent("AIzaSyBLvHRUeAQ7lOZeTpDC8BZcOlOeIncBfto");

    if (answer) {
        const feedbackPrompt = `Evaluate the following answer and provide feedback in a structured bullet-point format. Focus on end/final answer rather than complete context or steps & Identify mistakes and highlight their categories in bold (use *text* format). Provide short, precise corrections for each mistake in bullet points. Avoid long paragraphs—use concise and actionable feedback:\n
        Question: ${prompt}\n
        Answer: ${answer}\n
        Feedback:`;

        try {
            const feedbackResult = await agent.processInput(feedbackPrompt);
            
            // Update the question in database with feedback
            if (req.headers.authorization) {
                const token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, 'supersecret12');
                
                await Question.findOneAndUpdate(
                    { userId: decoded.id, question: prompt },
                    { 
                        feedback: feedbackResult,
                        score: feedbackResult.includes("Correctness") || feedbackResult.includes("Good job") ? 1 : 0
                    }
                );
            }
            
            return res.json({ feedback: feedbackResult });
        } catch (error) {
            console.error("Error analyzing the answer:", error);
            return res.status(500).json({ error: "Error analyzing answer" });
        }
    } else {
        const mainprompt = `
            You are an AI assistant with START, PLAN, ACTION, OBSERVATION, and OUTPUT states. 
            User: Give me a question (type of question model asked in interview) on ${prompt} so that I can prepare for my interview.
            PLAN: I will call the processResponse function to generate a question based on the topic.
            ACTION: Call processResponse with input "${prompt}".
            OBSERVATION: ${processResponse(prompt)}
            OUTPUT: 
        `;

        try {
            const result = await agent.processInput(mainprompt);
            
            if (req.headers.authorization) {
                const token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, 'supersecret12');
                
                const newQuestion = new Question({
                    question: prompt,
                });
                
                await newQuestion.save();
            }
            
            res.json({ response: result });
        } catch (error) {
            console.error("Error generating content:", error);
            res.status(500).json({ error: 'Error generating content' });
        }
    }
});
// Register Route
app.post("/register", async (req, res) => {
    const { username, email, password, education, interests } = req.body;
    if (!username || !password) {
        res.json({ success: false, msg: "Fill all the fields" })
    } else {
        try {
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.json({ success: false, msg: "User already exists" });
            } else {
                const hashpass = await bcrypt.hash(password, 10)
                const newuser = new userModel({ username, email, password: hashpass, education, interests })
                await newuser.save()
                const webtokens = jwt.sign({ id: newuser._id }, 'supersecret12', { expiresIn: '7d' });
                res.cookie('token', webtokens, {
                    httpOnly: true,
                    secure: 'development',
                    sameSite: 'none',
                    maxAge: 7 * 24 * 60 * 60 * 1000
                });
            }
        } catch (e) {
            console.log("Something went wrong", e)
        }

        res.json({ message: "User registered successfully" });
        console.log("User registered successfully")
    }
});

// Login Route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // ✅ Check required fields
    if (!email || !password) {
        return res.json({ success: false, msg: "Please enter the details!" });
    }

    try {
        const foundUser = await userModel.findOne({ email });
        if (!foundUser) {
            return res.json({ success: false, msg: "Invalid user" });
        }

        const matchPass = await bcrypt.compare(password, foundUser.password);
        if (!matchPass) {
            return res.json({ success: false, msg: "Invalid password!" });
        }

        const webtokens = jwt.sign({ id: foundUser._id }, 'supersecret12', { expiresIn: '7d' });

        res.cookie('token', webtokens, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({
            success: true, msg: "Login successful!", user: {
                id: foundUser._id,
                username: foundUser.username,
                email: foundUser.email,
                education: foundUser.education,
                interests: foundUser.interests,
                score: foundUser.score || 0,  // If you store scores
                questionHistory: foundUser.questionHistory || [] // Fetch question history if available
            },
            webtokens
        });

    } catch (error) {
        console.error("Error found:", error);
        return res.status(500).json({ success: false, msg: "Server error" });
    }

});

// app.put('/settings', async(req,res) => {
//     const { username, email, education, interests } = req.body;

//     console.log("Request Body:", req.body); // Log the request body
//     console.log("User ID from Token:", req.user.id); // Log the user ID from the token
  
//     try {
//       const user = await userModel.findById(req.user.id);
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       user.username = username || user.username;
//       user.email = email || user.email;
//       user.education = education || user.education;
//       user.interests = interests || user.interests;
  
//       await user.save();
//       res.status(200).json({ message: "User updated successfully", user });
//     } catch (error) {
//       console.error("Error updating user:", error); // Log the error
//       res.status(500).json({ message: "Server error", error: error.message });
//     }
// })

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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});