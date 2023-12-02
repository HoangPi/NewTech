const mongoose = require("mongoose");
const { Schema } = mongoose;

const pendingStudentSchema= mongoose.Schema({
    thesisid:{
        type: String,
        required: true,
    },
    studentid:{
        type: Schema.Types.ObjectId,
        ref:'student',
        required: true,
    },
},{timestamps: true});

const PendingStudent = mongoose.model('pendingStudent',pendingStudentSchema)
module.exports = PendingStudent