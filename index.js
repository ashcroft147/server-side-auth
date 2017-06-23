// Main starting point of the application
const express = require('express');
const http = require('http'); 
const bodyParser = require('body-parser'); // parse incoming requests
const morgan = require('morgan'); // logging lib 
const app = express();
const router = require('./router');
// nodemon watches our project directory for any file changes
// and if there is a changes, it restarts the server
// and anything changes we made make the server runnable up-to-date
const mongoose = require('mongoose');

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth');
const conn = mongoose.connection;

conn.once('open', function ()
{
    console.log('mongodb connection is successful');
});

// App Setup
// app.user(): registers as middleware
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
router(app);

// Server Setup
const port = process.env.PORT || 3090;

// http: native node lib which is working with very low level http incoming
const server = http.createServer(app); 
server.listen(port);
console.log('Server listening on: ', port);
