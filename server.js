'use strict';

// Load array of notes


console.log('Hello Noteful!');
const{ PORT } = require('./config');
// INSERT EXPRESS APP CODE HERE...
const express = require('express');
const data = require('./db/notes');
const app = express();
const { logger } = require('./middleware/logger');

app.use(express.static('public'));
app.use(logger);

app.listen(PORT, function() {
  console.info(`server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});



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
