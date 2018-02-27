import React from 'react';
import ReactDOM from 'react-dom';

import Quiz from './components/Quiz';

// Note: APP_PROPS is set on server-side
ReactDOM.hydrate(
  <Quiz {...APP_PROPS} />, 
  document.getElementById('root')
);
