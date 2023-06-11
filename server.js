const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const passportLocal = require('./Database/Passport');
const Seller = require('./Models/Seller');
const routes = require('./Routes/route');

const app = express();
const port = 3000;

const db = require('./Database/Mongoose');
const flash= require('connect-flash');
const customMware = require('./Database/Middleware');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./Public'));


app.set('view engine', 'ejs');
app.set ('views', './views');



app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

app.use(flash());
app.use(customMware.setFlash);


app.use(passport.initialize());
app.use(passport.session());



app.use('/', routes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
