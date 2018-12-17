'use strict';

// Load array of notes


console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');
const data = require('./db/notes');
const app = express();

app.use(express.static('public'));
// add static server

app.listen(8080, function() {
  console.info(`server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
app.get

app.get('/api/notes', (req, res) => {
  res.json(data);
});