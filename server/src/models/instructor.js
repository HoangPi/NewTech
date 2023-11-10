const mongoose = require("mongoose");

const instructorSchema= mongoose.Schema({
    fullname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
},{timestamps: true});

const Instructor = mongoose.model('instructor',instructorSchema)
module.exports = Instructor