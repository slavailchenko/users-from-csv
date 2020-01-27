const csv = require('csv-parser');
const fs = require('fs');
const logger = require('./logger');
const userSchema = require('./userSchema');

module.exports = class CSVService {
  static get name() {
    return 'CSVService';
  }

  getFields(file) {
    return new Promise((resolve, reject) => {
      let results = [];
      fs.createReadStream(file)
        .pipe(csv())
        .on('data', (row) => {
          row.age = Number(row.age);
          results.push(row);
        })
        .on('end', () => {
          logger.info('CSV file successfully processed');
          const { error } = userSchema.validate(results);
          if (error) {
            error.statusCode = 422;
            reject(error);
          }
          resolve(results);
        })
    });
  }
};