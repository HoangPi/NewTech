const mongoose = require("mongoose");

const studentSchema= mongoose.Schema({
    fullname:{
        type: String,
        required: true,
    },
    id:{
        type: String,
        required: true,
    },
    class:{
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

const Student = mongoose.model('student',studentSchema)
module.exports = Student