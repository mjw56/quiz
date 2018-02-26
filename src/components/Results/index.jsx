import React from 'react';
import PropTypes from 'prop-types';

import Question from '../Question';
import Button from '../Button';

import './style.scss';

const propTypes = {
  correct: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  handleRestart: PropTypes.func.isRequired,
};

const Results = ({ correct, questions, handleRestart }) => (
  <div className="results">
    <h1>Score: { parseInt(correct/questions.length * 100) }%</h1>
    
    { questions.map((question, i) => {
      return (
      <Question
        locked
        key={i}
        question={question}
        currentAnswer={[question.correctAnswer - 1]}
      />
    )})}

    <Button onClick={handleRestart}>restart</Button>
  </div>
);

Results.propTypes = propTypes;

export default Results;
