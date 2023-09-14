const { resolve } = require('path');
const config = require('./config');
const mongoose = require('mongoose');

const connect = () => {
    return new Promise(resolve => {
        mongoose.connect(config.server.DB_URL, {
            useUnifiedTopology: true, useNewUrlParser: true
        }).then(async () => {
            console.log("Database connected successfully");
            resolve();
        }).catch((error) => {
            console.log(error);
        });
    })
};

module.exports={
    connect
}

