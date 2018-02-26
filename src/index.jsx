import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

// Note: APP_PROPS is set on server-side
ReactDOM.hydrate(
  <App {...APP_PROPS} />, 
  document.getElementById('root')
);
