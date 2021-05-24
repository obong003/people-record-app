const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema ({
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
}, { timestamps: true });

const records  = mongoose.model('Recorder', recordSchema);

module.exports = records;