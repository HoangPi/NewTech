const mongoose = require("mongoose");

const thesisSchema= mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    instructorid:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    status:{
        type:String,
        required: true,
    },
    progress:{
        type: Number,
        required:true,
    }
},{timestamps: true});

const Thesis = mongoose.model('thesis',thesisSchema,'thesis')
module.exports = Thesis