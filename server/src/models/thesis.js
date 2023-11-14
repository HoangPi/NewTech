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
    jobs:{
        type:[],
        required: true,
    },
    progress:{
        type:[],
        required:true,
    },
    progressconfirm:{
        type:[],
        required:true,
    },
    description:{
        type: String,
        required: true,
    },
    status:{
        type:String,
        required: true,
    },
},{timestamps: true});

const Thesis = mongoose.model('thesis',thesisSchema,'thesis')
module.exports = Thesis