const express = require('express');
const passport = require('passport');
const path = require('path');

// eslint-disable-next-line new-cap
const router = express.Router();

/* GET login listing. */
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/login.html'));
});

/* POST login */
router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

module.exports = router;
