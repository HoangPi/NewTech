const mongoose = require("mongoose");

const taskSchema= mongoose.Schema({
    thesisid:{
        type: String,
        required: true,
    },
    job:{
        type: String,
        required: true,
    },
    submission:{
        type: String,
        default:null,
    },
    confirm:{
        type: Boolean,
        required: true,
    },
},{timestamps: true});

const Thesis = mongoose.model('task',taskSchema)
module.exports = Thesis