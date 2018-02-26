import React from 'react';

const propTypes = {};
const defaultProps = {};

const Html = (props) => (
  <html>
    <head>
      <title>Quiz</title>
      <link rel="stylesheet" href="bundle.css" />
    </head>
    <body>
      <div id="root">
        {props.children}
      </div>

      <script src="bundle.js"></script>
    </body>
  </html>
);

Html.propTypes = propTypes;
Html.defaultProps = defaultProps;

export default Html;
