function route(req, res) {
  const questions = require('../data/questions.json');

  const answers = req.body;
  let correct = 0;

  answers.forEach((answer) => {
    const question = questions.find(q => q.id === answer.id);

    if (question && question.correctAnswer === answer.answer) {
      correct++;
    }
  });

  res.json({ correct, questions });
}

module.exports = route;
