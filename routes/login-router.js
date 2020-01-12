const express = require('express');
const passport = require('passport');

// eslint-disable-next-line new-cap
const router = express.Router();

/* GET zone listing. */
router.get('/', (req, res) => {
  res.send(`<form action="/login" method="post">
<div>
    <label>Username:</label>
    <input type="text" name="username"/>
</div>
<div>
    <label>Password:</label>
    <input type="password" name="password"/>
</div>
<div>
    <input type="submit" value="Log In"/>
</div>
</form>`);
});

router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

module.exports = router;
