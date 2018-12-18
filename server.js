'use strict';




console.log('Hello Noteful!');
const express = require('express');
const{ PORT } = require('./config');
const { logger } = require('./middleware/logger');
const app = express();

// Load array of notes
const data = require('./db/notes');


app.use(express.static('public'));
app.use(logger);



app.get('/api/notes', (req, res) => {
  
  const searched = req.query.searchTerm;
  if(searched){
    let newArticles = data.filter(item => {
      return item.title.includes(searched);
    });
    res.json(newArticles);

  }else{
    res.json(data);
  }
});

app.get('/api/notes/:id', (req, res) => {
  const item = data.find(item => item.id === Number(req.params.id));
  res.json(item);
});

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

app.listen(PORT, function() {
  console.info(`server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
