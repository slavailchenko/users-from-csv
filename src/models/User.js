const Model = require('../db/knex');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_name', 'first_name', 'last_name', 'age'],
      properties: {
        id: { type: 'integer' },
        user_name: { type: 'string', minLength: 3, maxLength: 255 },
        first_name: { type: 'string', minLength: 3, maxLength: 255 },
        last_name: { type: 'string', minLength: 3, maxLength: 255 },
        age: { type: 'integer', minimum: 1 },
      },
    }
  }
};

module.exports = User;