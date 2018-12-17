'use strict';

// Load array of notes


console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');
const data = require('./db/notes');
const app = express();

app.use(express.static('public'));


app.listen(8080, function() {
  console.info(`server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});


app.get('/api/notes', (req, res) => {
  res.json(data);
});

app.get('/api/notes/:id', (req, res) => {
  const item = data.find(item => item.id === Number(req.params.id));
  res.json(item);
});
