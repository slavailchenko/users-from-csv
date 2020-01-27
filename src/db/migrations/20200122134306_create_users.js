exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('user_name').unique().notNullable();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.integer('age').notNullable();
      table.timestamps(true, true);
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('users')
};