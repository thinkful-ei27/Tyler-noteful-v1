'use strict';

// Load array of notes


console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');
const data = require('./db/notes');
const app = express();

// add static server

app.listen(8080, function() {
  console.info(`server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});