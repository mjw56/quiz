import React from 'react';
import PropTypes from 'prop-types';

import Question from '../Question';
import Button from '../Button';

import './style.scss';

const propTypes = {
  correct: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  handleRestart: PropTypes.func.isRequired,
  answers: PropTypes.array.isRequired,
};

function getColor(value){
  //value from 0 to 1
  var hue=((1-value)*120).toString(10);
  return ["hsl(",hue,",80%,40%)"].join("");
}

const Results = ({ answers, correct, questions, handleRestart }) => (
  <div className="results">
    <h1 style={{ color: getColor(1 - correct/questions.length)}}>
      Score: { parseInt(correct/questions.length * 100) }%
    </h1>
    
    { questions.map((question, i) => {
      const userAnswer = answers.find(a => a.id === question.id) || {};
      return (
        <Question
          locked
          key={i}
          question={question}
          currentAnswer={[question.correctAnswer - 1]}
          userAnswer={userAnswer.answer - 1}
        />
    )})}

    <Button onClick={handleRestart}>restart</Button>
  </div>
);

Results.propTypes = propTypes;

export default Results;
