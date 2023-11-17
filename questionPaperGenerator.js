const _ = require('lodash');

function generateQuestionPaper(questions, totalMarks, difficultyDistribution) {
  const questionPaper = [];

  _.forEach(difficultyDistribution, (percentage, difficulty) => {
    const count = Math.floor((percentage / 100) * totalMarks);

    const filteredQuestions = _.filter(questions, { difficulty });

    // Shuffle the questions to get random ones
    const shuffledQuestions = _.shuffle(filteredQuestions);

    // Add the required number of questions to the question paper
    questionPaper.push(...shuffledQuestions.slice(0, count));
  });

  return questionPaper;
}

module.exports = { generateQuestionPaper };
