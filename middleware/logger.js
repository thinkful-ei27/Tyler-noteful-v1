'use strict';
function logger(req, res, next) {
  const date = new Date();
  console.log(date);
  console.log(req.method);
  console.log(req.url);
  next();
}
module.exports = { logger };