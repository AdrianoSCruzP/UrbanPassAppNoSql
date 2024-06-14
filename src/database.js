const mongoose = require('mongoose');

const connection = mongoose.connect("mongodb://database:27017/urban-pass-db")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));

module.exports = connection;