const Authentication  = require('./controllers/authentication');

module.exports = app => {
    // req: http requests income
    // res: response to users
    // next: is mostly for error handling 
    app.post('/signup', Authentication.signup)
}