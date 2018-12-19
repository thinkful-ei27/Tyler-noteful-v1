'use strict';
const express = require('express');
const notesRouter = express.Router();
const data = require('../db/notes');
const simDB = require('../db/simDB');  // <<== add this
const notes = simDB.initialize(data); // <<== and this

notesRouter.get('/notes', (req, res, next) => {
  const { searchTerm } = req.query;
  
  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });
});
    
    
  
  
notesRouter.get('/notes/:id', (req, res, next) => {
  // const item = data.find(item => item.id === Number(req.params.id));
  // res.json(item);
  const { id } = req.params;
  notes.find(id, (err, list) => {
    if (err) {
      return next(err);
    }
    res.json(list);
  });
});
  
notesRouter.put('/notes/:id', (req, res, next) => {
  const id = req.params.id;
  
  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];
  
  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });
  
  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});

notesRouter.post('/notes', (req, res, next) => {
  const title = { title, content } = req.body;

  const newItem = { title, content }; 

  if(!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  notes.create(newItem, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.location(`http://${req.headers.host}/api/notes/${item.id}`).status(201).json(item);
    } else {
      next();
    }
  });
});

notesRouter.delete('/notes/:id', (req, res, next) => {
  const id = req.params.id;
  notes.delete(id, (err, item) => {
    if(err){
      return next(err);
    }
    if(item){ 
      res.status(500);
      res.status(204).end();
    }else{
      next();
    }
  });
  
});

module.exports = notesRouter;