const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    
    email:{
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
        }
});

const records  = mongoose.model('Recorder', recordSchema);

module.exports = records;