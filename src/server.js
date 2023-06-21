'use strict';

require("dotenv").config();
const express = require("express");
const app = express();
const usersRouter = require('./auth/router');
const notFoundHandler = require('./middleware/404');

app.use(express.json());
app.use(usersRouter);

app.get('/', welcomeHandler);
function welcomeHandler(req, res) {
    res.status(200).send('hello hello');
}

app.use('*', notFoundHandler);

function start(port) {
    app.listen(port, () => {
        console.log(`server is up and listen on ${port}`)
    });
}
module.exports = {
    start: start,
    app: app,
}