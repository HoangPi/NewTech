const Student = require("../models/student");
const Class = require('../models/class.js')
const app = require('../server.js');
const Instructor = require("../models/instructor.js");
const Category = require('../models/categories.js')
const Thesis = require('../models/thesis.js')

function setStudentSession(req,res){
    Student.findOne({id:req.body.id})
        .then((studentinfo)=>{
            req.session.instructorinfo=null
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
async function get1Student(req,res){
    Student.findOne({id:req.body.id})
        .then((studentinfo)=>{
            res.json({studentinfo})
        })
}
async function editStudent(req,res){
    const doc = await Student.findOneAndUpdate({id:req.body.studentinfo.id},
        {phone:req.body.studentinfo.phone,address: req.body.studentinfo.address},
        {returnOriginal:false})
    req.session.studentinfo=doc._doc
    res.json({studentinfo:doc._doc})
}
async function setInstructorSession(req,res){
    req.session.studentinfo=null
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
async function getCategories(req,res){
    Category.find()
        .then((categories)=>{
            res.json({categories})
        })
        .catch((err)=>console.log(err))
}
async function addThesis(req,res){
    if(typeof(req.session.instructorinfo)==='undefined'){
        res.json({status:false})
        return
    }
    for(let student of req.body.studentlist){
        let temp = await Student.findOne({id: student.id})
        if(temp.thesisid!==''){
            res.json({status:null})
            return
        }
    }
    var flag=true
    const doc = new Thesis({
        name: req.body.name,
        category: req.body.category,
        instructorid: req.session.instructorinfo._id,
        jobs:[],
        progress:[],
        progressconfirm:[],
        description:req.body.description,
        status:'on going',
    })
    
    doc.save()
        .then((result)=>{
            if(req.body.studentlist!==null){
                req.body.studentlist.map(async (value)=>{
                    
                    await Student.findOneAndUpdate({id:value.id},{
                        thesisid: result._id
                    })
                        // .then(()=>continue)
                })
            }
        })
        .catch(async err=>{
            flag=false
            await Thesis.findByIdAndRemove(doc._id, function(err,docs){ 
                if (err){ 
                    console.log(err) 
                } 
                else{ 
                    console.log("Removed User : ", docs); 
                } 
            })
        })
        .finally(()=>{res.json({status:flag})})
    
}
async function getInstructorThesis(req,res){
    Thesis.find({instructorid:req.session.instructorinfo._id})
        .then((result)=>{
            res.json({thesis:result})
        })
        .catch(err=>{
            console.log(err)
            res.json({})
        })
}
module.exports = {
    setStudentSession,
    editStudent,
    setInstructorSession,
    getCategories,
    get1Student,
    addThesis,
    getInstructorThesis,
}