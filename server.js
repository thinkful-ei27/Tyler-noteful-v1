'use strict';




console.log('Hello Noteful!');
const express = require('express');
const{ PORT } = require('./config');
const notesRouter = require('./router/notes.router');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use('/api', notesRouter);
// Load array of notes
// const data = require('./db/notes');

// Simple In-Memory Database







app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

if (require.main === module) {
  app.listen(PORT, function() {
    console.info(`server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });
}
module.exports = app;