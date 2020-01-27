const { databaseConfig } = require('./src/config');

module.exports = {

  development: {
    client: databaseConfig.client,
    connection: {
      host: databaseConfig.connection.host,
      port: databaseConfig.connection.port,
      user: databaseConfig.connection.user,
      password: databaseConfig.connection.password,
      database: databaseConfig.connection.database,
      charset: 'utf8',
    },
    useNullAsDefault: true,
    migrations: {
      directory: `${__dirname}/src/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/db/seeds`,
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

};