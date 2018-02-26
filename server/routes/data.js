function route(req, res) {
  const data = require('../data/questions.json');

  res.json(data);
}

module.exports = route;
