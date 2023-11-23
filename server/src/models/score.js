const mongoose = require("mongoose");

const scoreSchema= mongoose.Schema({
    thesisid:{
        type: String,
        required: true,
    },
    studentid:{
        type: String,
        required: true
    },
    score:{
        type: Number,
        required: true,
    },
},{timestamps: true});

const Score = mongoose.model('score',scoreSchema)
module.exports = Score