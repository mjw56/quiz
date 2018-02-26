import React from 'react';
import PropTypes from 'prop-types';

import Quiz from '../Quiz';

import './style.scss';

const propTypes = {
  questions: PropTypes.array.isRequired,
};
const defaultProps = {
  questions: []
};

const App = (props) => (
  <div className="app">
    <Quiz questions={props.questions} />
  </div>
);

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
