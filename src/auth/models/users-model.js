'use strict';

const bcrypt = require('bcrypt');

const Users = (sequelize, DataTypes) =>
    sequelize.define('Users', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
Users.basic = async function (username, password) {
    console.log(username, password)
    const user = await Users.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
        return user;
    }
    else {
        throw new Error('Invalid User');
    }
}

module.exports = Users;