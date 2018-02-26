import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import Button from '../Button';

import './style.scss';

const propTypes = {
  question: PropTypes.object.isRequired,
  currentAnswer: PropTypes.array.isRequired,
  handleQuestionAnswer: PropTypes.func,
  userAnswer: PropTypes.number
};
const defaultProps = {
  question: {},
  currentAnswer: []
};

const Question = ({ 
  question: { question, answers },
  currentAnswer,
  handleQuestionAnswer,
  locked,
  checkboxClass = '',
  userAnswer
}) => (
  <div className={`question ${locked ? 'locked' : ''}`}>
    <h3>{question}</h3>

    <CheckboxGroup
      className="checkboxes"
      checkboxDepth={2} 
      name="answers" 
      value={currentAnswer} 
      onChange={handleQuestionAnswer}
    >
      { answers.map((a, i) => (
        <label 
          className={
            locked && 
              currentAnswer[0] === i ? 'answer' : 
              userAnswer === i ? 'wrong-answer' : ''
          }
        >
          <Checkbox 
            disabled={locked} 
            key={i} 
            value={i}
            id={`cb${i}`}
          />

          <label for={`cb${i}`}>
            <span></span>
            {a}
          </label>
        </label>
      ))}
    </CheckboxGroup>
  </div>
);

Question.propTypes = propTypes;
Question.defaultProps = defaultProps;

export default Question;
