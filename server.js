const dotenv = require('dotenv');

dotenv.config();
require('./config/databse.js');
const express = require('express');

const app = express();

const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Controllers
const authController = require('./controllers/auth.js');
const calcController = require('./controllers/calc.js');
const PORT = process.env.PORT ? process.env.PORT : '3000';
app.use('/users/:userId/calc', calcController);
// MIDDLEWARE
//
// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride('_method'));
// Morgan for logging HTTP requests
app.use(morgan('dev'));

// Session Storage with MongoStore
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

// Add user variable to all templates
app.use(passUserToView);

// PUBLIC
app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.use('/auth', authController);
app.use('/users/:userId/calc', calcController);


app.get('/', (req, res) => {
  // Check if the user is signed in
  if (req.session.user) {
    // Redirect signed-in users to their applications index
    res.redirect(`/users/${req.session.user._id}/calc`);
  } else {
    // Show the homepage for users who are not signed in
    res.render('index.ejs');
  }
});
app.use(isSignedIn)
app.listen(PORT, () => {
  console.log(`The express app is ready on port ${PORT}!`);
});
