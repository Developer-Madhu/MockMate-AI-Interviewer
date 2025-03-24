const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const { authenticateToken } = require('../middleware/auth');

// Save a new question
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { question, answer, feedback, score } = req.body;
    const newQuestion = new Question({
      userId: req.user.id,
      question,
      answer,
      feedback,
      score
    });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all questions for a user
router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const questions = await Question.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get question statistics for dashboard
router.get('/stats/:userId', authenticateToken, async (req, res) => {
  try {
    const stats = await Question.aggregate([
      { $match: { userId: req.user.id } },
      {
        $group: {
          _id: null,
          totalQuestions: { $sum: 1 },
          averageScore: { $avg: "$score" },
          questionsByMonth: {
            $push: {
              month: { $month: "$createdAt" },
              score: "$score"
            }
          }
        }
      }
    ]);
    res.json(stats[0] || { totalQuestions: 0, averageScore: 0, questionsByMonth: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 