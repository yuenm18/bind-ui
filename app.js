const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const firebase = require('firebase/app');

require('firebase/auth');
require('dotenv').config();

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
});

const zoneRouter = require('./routes/zone-router');
const recordTypesRouter = require('./routes/record-types-router');
const loginRouter = require('./routes/login-router');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
app.use(session({
  cookie: { maxAge: 86400000 },
  secret: process.env.SECRET,
  store: new MemoryStore({
    checkPeriod: 86400000,
  }),
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/api/login', loginRouter);
app.use('/api/zone', zoneRouter);
app.use('/api/record-types', recordTypesRouter);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await firebase.auth()
        .signInWithEmailAndPassword(username, password);
    return done(null, user);
  } catch (error) {
    return done(null, false);
  }
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = app;
