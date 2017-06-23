const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = { usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    // Verify this email and password, call done with the user
    // true
    // false
    User.findOne( {email: email}, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }

        // compare passwords - is 'password' equal to user.password(encrypted) ?
        user.comparePassword(password, function(err, isMatch) {
            if (err) { return done(err); }
            if(isMatch) { return done(null, false); }

            return done(null, user);
        })
    });
});

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT strategy
// payload: decoded JWT token
// done: callback function used for that we are able to successfully authenticate this user
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    // See if the user id in the payload exists in our database
    // true, call done with that other
    // false, call done without a user object
    User.findById(payload.sub, (err, user) => {
        if(err) { return done(err, false )}; // did'nt search

        if(user) { 
            done(null, user);
        } else {
            done(null, false); // search but no user
        }
    });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);