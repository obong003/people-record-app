const mongoose = require('mongoose');
const connectionString = "mongodb://localhost:27017/appRecord";

module.exports = function () {
    mongoose.connect( connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, (err) => {
        if (err) {
           // return (console.log("error connecting to database"));
           return console.log({ message: err.message })
        } else {
            return (console.log("database up and running!"))
        }
    });
}
