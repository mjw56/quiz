import React from 'react';
import PropTypes from 'prop-types';

import Question from '../Question';
import Results from '../Results';
import Button from '../Button';

import './style.scss';

const propTypes = {
  questions: PropTypes.array.isRequired,
};
const defaultProps = {
  questions: []
};

class Quiz extends React.Component {
  state = {
    started: false,
    done: false,
    question: 0, 
    answers: [], 
    currentAnswer: [],
    results: null
  }
  handleBeginQuiz = () => {
    this.setState({
      started: true
    });
  }
  postAnswers = () => {
    const { answers } = this.state;

    fetch('/get-score', { 
      method: 'post', 
      body: JSON.stringify(answers),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          loadingAnswers: false,
          done: true,
          results: res
        })
      });
  }
  handleNextQuestion = () => {
    const { questions } = this.props;

    this.setState(({ currentAnswer, answers, question }) => {
      let nextAnswers = [
        ...answers, 
        { 
          id: questions[question].id, 
          answer: currentAnswer[0] + 1 
        }
      ];

      return {
        currentAnswer: [],
        answers: nextAnswers,
        loadingAnswers: !!(question + 1 === questions.length),
        question: (question + 1 <= questions.length) && question + 1
      }
    }, () => {
      const { loadingAnswers } = this.state;

      if (loadingAnswers === true) {
        this.postAnswers();
      }
    });
  }
  handleQuestionAnswer = (newValue, event, name) => {
    this.setState({
      currentAnswer: [parseInt(event.target.value)]
    });
  }
  handleRestart = () => {
    this.setState({
      started: false,
      done: false,
      question: 0, 
      answers: [], 
      currentAnswer: [],
      results: null
    });
  }
  stillInQuiz = () => {
    const { started, loadingAnswers, done } = this.state;
    return started === true && loadingAnswers !== true && done !== true;
  }

  render() {
    const { questions } = this.props;
    const { 
      started,
      loadingAnswers,
      done,
      question,
      currentAnswer,
      answers,
      results
    } = this.state;

    return (
      <div className={`quiz ${!!results && 'scroll-content'}`}>
        { started === false && (
          <>
            <Button onClick={this.handleBeginQuiz}>Begin Quiz</Button>
            <span className="quiz-info">{questions.length} total questions</span>
          </>
        )
          
        }

        { this.stillInQuiz() && 
          (
            <>
              <span className="counter">
                {`${question + 1}/${questions.length}`}
              </span>
              <Question 
                question={questions[question]}
                currentAnswer={currentAnswer}
                handleNextQuestion={this.handleNextQuestion}
                handleQuestionAnswer={this.handleQuestionAnswer}
              />
              <Button onClick={this.handleNextQuestion}>Next</Button>
            </>
          )
        }

        { loadingAnswers === true && <span>Calculating Results...</span> }
        
        { done === true && 
          <Results
            {...results}
            handleRestart={this.handleRestart}
            answers={answers}
          /> 
        }
      </div>
    );
  }
}

Quiz.propTypes = propTypes;
Quiz.defaultProps = defaultProps;

export default Quiz;
