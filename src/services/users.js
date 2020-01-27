const ObjectsToCsv = require('objects-to-csv');
const CSVService = require('./helperCSV');
const { User } = require('../models');
const { pathFileCSV } = require('../config');

const srvCSV = new CSVService();

module.exports = class UserService {
  static get name() {
    return 'UserService';
  }

  async addUsers(fromFile) {
    const outArray = await srvCSV.getFields(fromFile);
    return User
      .query()
      .insert(outArray)
      .returning('*');
  }

  getUsers(...fields) {
    return User
      .query()
      .select(...fields)
      .orderBy('id');
  }

  async downloadUsers() {
    const users = await this.getUsers('user_name', 'first_name', 'last_name', 'age');
    const date = new Date().getTime();
    const fileName = `${date}-out.csv`;
    const outputFilePath = `${pathFileCSV.outputDir}/${fileName}`;
    await new ObjectsToCsv(users).toDisk(outputFilePath);
    return {
      outputFilePath,
      fileName,
    };
  }
};