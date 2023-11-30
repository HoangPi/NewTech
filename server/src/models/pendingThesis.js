const mongoose = require("mongoose");

const pendingThesisSchema= mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    instructorid:{
        type:String,
        required:true,
    }
},{timestamps: true});

const PendingThesis = mongoose.model('pendingThesis',pendingThesisSchema)
module.exports = PendingThesis