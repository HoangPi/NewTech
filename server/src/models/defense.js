const mongoose = require("mongoose");

const defenseSchema= mongoose.Schema({
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'instructor',
        required: true,
    },
    thesis:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'thesis',
        required:true,
    },
    date: {
        type: mongoose.Schema.Types.Date,
        required: true,
    }
},{timestamps: true});

const Defense = mongoose.model('defense',defenseSchema)
module.exports = Defense