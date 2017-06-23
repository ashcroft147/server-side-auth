const Authentication  = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// session: false -> default passport wants to try to make a cookie based session for the request
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local',  { session: false } );

module.exports = app => {
    // req: http requests income
    // res: response to users
    // next: is mostly for error handling 
    app.get('/', requireAuth, (req, res) => {
        res.send( { hi: 'there '});
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup)
}