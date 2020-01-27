const express = require('express');
const passport = require('passport');

// eslint-disable-next-line new-cap
const router = express.Router();

/* POST login */
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.cookie('bind-ui', '{"isAuthenticated": true}', { maxAge: 86400000 });
  res.send();
});

/* POST logout */
router.post('/logout', (req, res) => {
  res.cookie('bind-ui', '{"isAuthenticated": false}');
  req.logout();
  res.send();
});

module.exports = router;
