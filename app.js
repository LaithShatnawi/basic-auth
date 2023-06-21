'use strict';

require("dotenv").config();
let port = process.env.PORT;
const app = require('./src/server');
const { db } = require('./src/auth/models/index');

db.sync()
    .then(() => {
        app.start(port);
    }).catch(e => {
      console.error('Could not start server', e.message);
  });