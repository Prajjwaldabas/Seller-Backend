const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Seller=require('../Models/Seller')

// Configure the local strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  }, async (req, email, password, done) => {
    try {
      const seller = await Seller.findOne({ email });
  
      if (!seller || !(await seller.verifyPassword(password))) {
        return done(null, false, { message: 'Incorrect email or password' });
      }
  
      req.flash('success', 'Logged in Successfully');
      return done(null, seller);
    } catch (error) {
      return done(error);
    }
  }));
  

  

// Serialize and deserialize user functions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const seller = await Seller.findById(id);
    done(null, seller);
  } catch (error) {
    done(error);
  }
});

// Initialize Passport middleware

