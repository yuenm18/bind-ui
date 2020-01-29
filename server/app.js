const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const helmet = require('helmet');
const firebase = require('firebase/app');

require('firebase/auth');
require('dotenv').config();

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
});

const zoneRouter = require('./routes/zone-router');
const authRouter = require('./routes/auth-router');

const app = express();

// Add security headers
app.use(helmet());
app.use(helmet.hidePoweredBy());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Add session cookies
app.use(session({
  cookie: {
    maxAge: 86400000,
    secure: process.env.NODE_ENV === 'production',
  },
  secret: process.env.SECRET,
  store: new MemoryStore({
    checkPeriod: 86400000,
  }),
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// register routes
app.use('/api/auth', authRouter);
app.use('/api/zone', zoneRouter);

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await firebase.auth()
        .signInWithEmailAndPassword(username, password);
    console.log(`User: ${username} login successful`);
    return done(null, user);
  } catch (error) {
    console.error(`User: ${username} login failed`, error);
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
