const express = require('express');
const recordTypes = require('../constants/record-types');
// eslint-disable-next-line new-cap
const router = express.Router();

/* GET record types. */
router.get('/', function(req, res, next) {
  if (!req.user) {
    return res.status(401).send();
  }

  res.send(recordTypes);
});

module.exports = router;
