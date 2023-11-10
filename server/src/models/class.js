const mongoose = require("mongoose");

const classSchema= mongoose.Schema({
    id:{
        type: String,
        required: true,
    },
    falculty:{
        type: String,
        required: true,
    },
},{timestamps: true});

const Class = mongoose.model('class',classSchema)
module.exports = Class