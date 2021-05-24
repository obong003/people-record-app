const mongoose = require('mongoose');
const connectionString = "mongodb+srv://idiyake:pauline0509@cluster0.vkukq.mongodb.net/appRecord?retryWrites=true&w=majority";

module.exports = function () {
    mongoose.connect( connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
       
    }, (err) => {
        if (err) {
           return console.log({ message: err.message })
        } else {
            return (console.log("database up and running!"))
        }
    });
}
