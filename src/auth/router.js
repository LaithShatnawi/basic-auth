'use strict';

const express = require('express');
const usersRouter = express.Router();
const bcrypt = require('bcrypt');
const basic = require('./middleware/basic')
const { Users } = require('../auth/models/index');

// Process FORM intput and put the data on req.body
usersRouter.use(express.urlencoded({ extended: true }));

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup username=john password=foo
usersRouter.post('/signup', async (req, res) => {

    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const record = await Users.create(req.body);
        res.status(200).json(record);
    } catch (e) { res.status(403).send('Error Creating User'); }
});


// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
usersRouter.post('/signin', basic, (req, res) => {
    res.status(200).json(req.user);
});

module.exports = usersRouter;