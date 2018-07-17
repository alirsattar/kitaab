require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const bcrypt       = require('bcryptjs');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);
const passport     = require('passport');
const app          = express();
const flash        = require('connect-flash');
const ensureLogin  = require('connect-ensure-login');
const LocalStrategy = require('passport-local').Strategy;

const User         = require('./models/user');


// SETTING CONDITIONS FOR EXPRESSION

app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/kitaab-project', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// SETTING UP PASSPORT

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.use(flash());


passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, next) => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));



app.use(passport.initialize());
app.use(passport.session());

// default value for title local
// app.locals.title = 'Express - Generated with IronGenerator';

app.use ((req, res, next)=>{
  if(req.user){
    res.locals.user = req.user; // !!!!!!
  }
  next();
});


// INDEX/LANDING PAGE ROUTES

const index = require('./routes/index');
app.use('/', index);

// USER ROUTES

const user = require('./routes/userRoutes');
app.use('/', user);

// USER ROUTES

const groups = require('./routes/groupRoutes');
app.use('/', groups);

const books = require('./routes/bookRoutes');
app.use('/', books);


module.exports = app;
