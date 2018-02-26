require('dotenv').config();
require('@babel/register')({
  presets: ['@babel/preset-react', '@babel/preset-env'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    ['babel-plugin-transform-require-ignore', { extensions: ['.scss']}]
  ]
});

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');

const graphqlHTTP = require('express-graphql');
// const schema = require('../shared/graphql');

app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', routes.home);
app.get('/data', routes.data);
app.post('/get-score', routes.getScore);

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});