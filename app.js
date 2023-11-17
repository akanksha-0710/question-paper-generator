const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const Question = require('./QuestionModel');
const { generateQuestionPaper } = require('./questionPaperGenerator');

const app = express();
app.use(bodyParser.json());

connectDB();

// Add routes here


app.post('/questions', async (req, res) => {
    try {
      const question = new Question(req.body);
      await question.save();
      res.status(201).json(question);
    } catch (error) {
      console.error('Error creating question:', error.message);
      res.status(500).send('Server Error');
    }
  });
  
  app.post('/generate-paper', async (req, res) => {
    try {
      const { totalMarks, difficultyDistribution, topicDistribution } = req.body;
  
      const questions = await Question.find();
  
      // Add logic for topic distribution if needed
  
      const questionPaper = generateQuestionPaper(questions, totalMarks, difficultyDistribution);
  
      res.json({ questionPaper });
    } catch (error) {
      console.error('Error generating question paper:', error.message);
      res.status(500).send('Server Error');
    }
  });
  
  // ... (other routes if needed)
  
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
