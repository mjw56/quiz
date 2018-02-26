function route(req, res) {
  const Html = require('../../src/components/Html').default;
  const App = require('../../src/components/App').default;
  const React = require('react');
  const ReactDOMServer = require('react-dom/server');

  const questions = require('../data/questions.json');

  const filterOutAnswer = question => { let { correctAnswer, ...filtered } = question; return filtered; }
  const APP_PROPS = { 
    questions: questions.map(filterOutAnswer)
  };
  const CLIENT_JS_SCOPE = `var APP_PROPS = ${JSON.stringify(APP_PROPS)};`;

  const markup = ReactDOMServer.renderToString(
    React.createElement(Html, null, 
      React.createElement(App, APP_PROPS, null),
      React.createElement('script', {
        dangerouslySetInnerHTML: {__html: CLIENT_JS_SCOPE
      }})
    )
  );

  res.send(markup);
}

module.exports = route;
