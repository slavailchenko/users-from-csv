const winston = require('winston');
const { combine, timestamp, colorize, simple, printf, errors } = winston.format;
const cls = require('cls-hooked');

const myLogger = winston.createLogger({
  levels: winston.config.npm.levels,
  format: combine(
    winston.format((info) => {
      const clsNamespace = cls.getNamespace('sample');
      info.traceID = clsNamespace.get('traceID') || 'noCorrelationIdValue';
      return info;
    })(),
    timestamp(),
    errors({stack: true}),
    colorize(),
    printf(({timestamp, traceID, level, message}) => {
      return `${level}: [TraceID: ${traceID}] => ${message} // ${timestamp}`;
    })
  ),
  transports: [
    new winston.transports.Console()
  ]
});

module.exports = myLogger;