const winston = require('winston');
const { combine, timestamp, colorize, simple } = winston.format;

const myLogger = winston.createLogger({
  levels: winston.config.npm.levels,
  format: combine(
    colorize(),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    simple(),
  ),
  transports: [
    new winston.transports.Console()
  ]
});

module.exports = myLogger;