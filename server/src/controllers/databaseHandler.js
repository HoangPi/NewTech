const Student = require("../models/student");
const Class = require('../models/class.js')
const app = require('../server.js');
const Instructor = require("../models/instructor.js");

function setStudentSession(req,res){
    Student.findOne({id:req.body.id})
        .then((studentinfo)=>{
            Class.findOne({id:studentinfo.classid})
                .then((classinfo)=>{
                    req.session.studentinfo=studentinfo
                    res.json({studentinfo,classinfo,state:true})
                })
                .catch(()=>{
                    res.json({state:false})
                })
        })
        .catch(()=>{
            res.json({state:false})
        })
}
async function editStudent(req,res){
    // Student.findOneAndUpdate({id: req.body.studentinfo.id},
    //     {$set:{phone:req.body.studentinfo.phone,
    //     address: req.body.studentinfo.address}},
    //     {returnOriginal: false, new:true},(err,doc)=>{
    //         if(err) res.json({message:"Fail"})
    //         console.log(doc)
    //         req.session.studentinfo=doc
    //         res.json({studentinfo:doc})
    //     })
    const doc = await Student.findOneAndUpdate({id:req.body.studentinfo.id},
        {phone:req.body.studentinfo.phone,address: req.body.studentinfo.address},
        {returnOriginal:false})
    req.session.studentinfo=doc._doc
    res.json({studentinfo:doc._doc})
}
async function setInstructorSession(req,res){
    Instructor.findOne({email:req.body.email})
        .then((instructorinfo)=>{
            if(instructorinfo===null || typeof(instructorinfo)==='undefined'){
                res.json({status:false})
                return
            }
            req.session.instructorinfo=instructorinfo
            res.json({instructorinfo,status:true})
        })
        .catch(()=>{
            res.json({status:false})
        })
}
module.exports = {
    setStudentSession,
    editStudent,
    setInstructorSession,
}