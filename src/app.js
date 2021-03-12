const express = require('express');
const cls = require('cls-hooked');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./services/logger');
const traceIdBinder = require('./middleware/cls.hooked.middleware');

const ns = cls.createNamespace('sample');
app.use(traceIdBinder(ns));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1/users', require('./routes/users'));

app.use((err, req, res, next) => {
  err.status = err.statusCode || 500;
  logger.error(`Request failed!!!: ${req.originalUrl}; status: ${err.status}; message: ${err.message}`);
  res.status(err.status).json({
    status: 'fail',
    path: req.originalUrl,
    method: req.method,
    name: err.name,
    message: err.message,
  });

});

module.exports = app;