const express = require('express');
const passport = require('passport');

// eslint-disable-next-line new-cap
const router = express.Router();

/**
 * Note: The 'bind-ui' cookie isn't used for security.  It is only used so
 * that the frontend knows if it should redirect to the login page or not
 * on initial page load
 */

/* POST login */
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.cookie('bind-ui', '{"isAuthenticated": true}');
  res.send();
});

/* POST logout */
router.post('/logout', (req, res) => {
  res.cookie('bind-ui', '{"isAuthenticated": false}');
  req.logout();
  res.send();
});

module.exports = router;
