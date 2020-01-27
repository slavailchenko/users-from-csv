const path = require('path');

module.exports = {
  connectionConfig: {
    port: process.env.PORT || 3001,
  },
  databaseConfig: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || 'user-test',
      password: process.env.DB_PWD || 'user-test',
      database: process.env.POSTGRES_DB || 'users-from-csv',
    },
  },
  pathFileCSV: {
    input: process.env.INPUT_PATH || '../../upload/',
    outputDir: path.resolve(__dirname, '../../download/'),
  },
};