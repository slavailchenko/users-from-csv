const express = require('express');
const router = express.Router();
const multer = require('multer');
const { pathFileCSV } = require('../config');
const usersCtrl = require('../controllers/users');

const upload = multer({
  dest: pathFileCSV.input,
  fileFilter: (req, file, cb) => {
    file.mimetype === 'text/csv' ? cb(null, true) : cb(null, false);
  }
});

router.post('/', upload.single('file'), usersCtrl.post);
router.get('/', usersCtrl.get);
router.get('/download', usersCtrl.download);

module.exports = router;