const app = require('./src/app');
const server = require('http').createServer(app);
const logger = require('./src/services/logger');
const { connectionConfig } = require('./src/config');

server.listen(connectionConfig.port, () => {
  logger.info(`Running server on port ${connectionConfig.port}`);
});

function shutDown() {
  logger.info('Received kill signal, shutting down gracefully');
  server.close(() => {
    logger.info('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 60000);
}

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);