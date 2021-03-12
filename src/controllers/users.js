const fs = require('fs');
const UserService = require('../services/users');
const logger = require('../services/logger');

const userSrv = new UserService();

module.exports = {
  post: async (req, res, next) => {
    try {
      const file = req.file.path;
      const newUsers = await userSrv.addUsers(file);
      if (!newUsers.length) {
        throw new Error('Array of users is empty');
      }
      res.status(201).json({
        success: 'ok',
        items: newUsers,
      })
    } catch (err) {
      return next(err);
    }
  },

  get: async (req, res, next) => {
    try {
      const users = await userSrv.getUsers('*');
      logger.warn(`GET users`);
      res.status(200).json({
        success: 'ok',
        items: users,
      })
    } catch (err) {
      return next(err);
    }
  },

  download: async (req, res, next) => {
    try {
      res.setHeader('Content-type', 'text/csv');
      const { outputFilePath, fileName } = await userSrv.downloadUsers();
      res.status(200).download(outputFilePath, fileName, err => {
        if (err) {
          logger.error(err);
          return next(err);
        }
        logger.info(`File ${fileName} sent to client`);
        fs.unlink(outputFilePath, err => {
          if (err) {
            logger.error(err);
            return next(err);
          }
          logger.warn(`File ${fileName} removed`);
        })
      });
    } catch (err) {
      return next(err);
    }
  },
};