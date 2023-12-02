const Student = require("../models/student");
const Class = require('../models/class.js')
const app = require('../server.js');
const Instructor = require("../models/instructor.js");
const Category = require('../models/categories.js')
const Thesis = require('../models/thesis.js')
const Task = require('../models/task.js')
const Score = require('../models/score.js')
const PendingThesis = require('../models/pendingThesis.js')
const PendingStudent = require('../models/pendingStudent.js')

function setStudentSession(req, res) {
    Student.findOne({ id: req.body.id })
        .then((studentinfo) => {
            req.session.instructorinfo = null
            Class.findOne({ id: studentinfo.classid })
                .then((classinfo) => {

                    req.session.studentinfo = studentinfo
                    res.json({ studentinfo, classinfo, state: true })
                })
                .catch(() => {
                    res.json({ state: false })
                })
        })
        .catch(() => {
            res.json({ state: false })
        })
}
async function get1Student(req, res) {
    Student.findOne({ id: req.body.id })
        .then((studentinfo) => {
            res.json({ studentinfo })
        })
        .catch(err=>{res.json({message:err})})
}
async function editStudent(req, res) {
    const doc = await Student.findOneAndUpdate({ id: req.body.studentinfo.id },
        { phone: req.body.studentinfo.phone, address: req.body.studentinfo.address },
        { returnOriginal: false })
    req.session.studentinfo = doc._doc
    res.json({ studentinfo: doc._doc })
}
async function setInstructorSession(req, res) {
    req.session.studentinfo = null
    Instructor.findOne({ email: req.body.email })

        .then((instructorinfo) => {
            if (instructorinfo === null || typeof (instructorinfo) === 'undefined') {
                res.json({ status: false })
                return
            }

            req.session.instructorinfo = instructorinfo
            res.json({ instructorinfo, status: true })
        })
        .catch(() => {
            res.json({ status: false })
        })
}
async function getCategories(req, res) {
    Category.find()
        .then((categories) => {
            res.json({ categories })
        })
        .catch((err) => console.log(err))
}
async function addThesis(req, res) {
    if (typeof (req.session.instructorinfo) === 'undefined') {
        res.json({ status: false })
        return
    }
    for (let student of req.body.studentlist) {
        let temp = await Student.findOne({ id: student.id })
        if (temp.thesisid !== '') {
            res.json({ status: null })
            return
        }
    }
    var flag = true
    const doc = new Thesis({
        name: req.body.name,
        category: req.body.category,
        instructorid: req.session.instructorinfo._id,
        description: req.body.description,
        progress: 0,
        status: 'on going',
    })

    doc.save()
        .then((result) => {
            if (req.body.studentlist !== null) {
                req.body.studentlist.map(async (value) => {

                    await Student.findOneAndUpdate({ id: value.id }, {
                        thesisid: result._id
                    })
                    // .then(()=>continue)
                })
            }
        })
        .catch(async err => {
            flag = false
            await Thesis.findByIdAndRemove(doc._id, function (err, docs) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Removed User : ", docs);
                }
            })
        })
        .finally(() => { res.json({ status: flag }) })

}
async function getInstructorThesis(req, res) {
    Thesis.find({ instructorid: req.session.instructorinfo._id })
        .then((result) => {
            req.session.thesisList = result
            res.json({ thesis: result })
            // .then(()=>{
            //     res.json({thesis:result})
            // })

        })
        .catch(err => {
            console.log(err)
            res.json({})
        })
}
async function getStudents(req, res) {
    Student.find({ thesisid: req.body.thesisID })
        .then((docs) => {
            res.json({ studentList: docs })
        })
}
async function getTasks(req, res) {
    Task.find({ thesisid: req.body.thesisID })
        .then((docs) => {
            res.json({ tasks: docs })
        })
}
async function addTasks(req, res) {
    try{
        for (let task of req.body.tasks) {
        t = new Task({
            thesisid: req.body.thesisID,
            job: task,
            confirm: false,
        })
        await t.save()
        }
        //calculate the progress
        const tasks = await Task.find({ thesisid: req.body.thesisID })
        var total = Object.keys(tasks).length
        if (total !== 0) {
            var count = 0
            for (let task of tasks) {
                if (task.confirm) count++
            }
            const roundedProgress = Math.round(100 * count / total)
            await Thesis.findOneAndUpdate({ _id: req.body.thesisID }, { progress: roundedProgress })
        }
        res.json({ status: true })
    }
    catch{
        res.json({status:false})
    }
}
async function getThesisByID(req, res) {
    
    Thesis.findOne({ _id: req.body.id })
        .then((result) => {
            // console.log(result)
            res.json({ thesis: result })
        })
        .catch(err=>{
            console.log(err)
            res.json({status:false})
        })
}
async function submitTasks(req, res) {
    //using for loop to execute the program sequentially
    try {
        const doc = await Task.findOneAndUpdate({ _id: req.body.taskid }, { submission: req.body.submission })
        res.json({ status: true })
    }
    catch (err) {
        console.log(err)
        res.json({ status: false })
    }
}
async function confirmTask(req, res) {
    try {
        const sample = await Task.findOneAndUpdate({ _id: req.body.taskid }, { confirm: true })
        const tasks = await Task.find({ thesisid: sample.thesisid })
        var total = Object.keys(tasks).length
        if (total !== 0) {
            var count = 0
            for (let task of tasks) {
                if (task.confirm) count++
            }
            const roundedProgress = Math.round(100 * count / total)
            await Thesis.findOneAndUpdate({ _id: sample.thesisid }, { progress: roundedProgress })
        }
        res.json({ status: true })
    }
    catch (err) {
        console.log(err)
        res.json({ status: false })
    }
}
async function addScore(req,res){
    try{
        await Thesis.findOneAndUpdate({_id:req.body.thesisid},{status:'Finished'})
        const students = await Student.find({thesisid:req.body.thesisid})
        for(let student of students){
            await Student.findOneAndUpdate({id:student.id},{thesisid:''})
            let score = Score({
                thesisid:req.body.thesisid,
                studentid:student.id,
                score:req.body.score,
            })
            await score.save()
        }
        res.json({status:true})
    }
    catch(err){
        console.log(err)
        res.json({status:false})
    }
}
async function getScore(req,res){
    try{
        console.log(req.body)
        const scores = await Score.find({thesisid:req.body.thesisid})
        var students = []
        for(let score of scores){
            let temp = await Student.findOne({id:score.studentid})
            students.push(temp)
        }
        res.json({studentList:students,scores: scores})
    }
    catch(error){
        console.log(error)
        res.json({status:false})
    }
}
async function editInstructorProfile(req,res){
    try{
        if(typeof(req.session.instructorinfo)==='undefined' || req.session.instructorinfo===null){
            res.json({status:false})
        }
        else{
            Instructor.findOneAndUpdate({_id:req.session.instructorinfo._id},{
                phone:req.body.phone,
                address:req.body.address,
            },
            {returnOriginal:false})
                .then(doc=>{
                    req.session.instructorinfo=doc
                    res.json({instructorinfo:doc})
                })
        }
    }
    catch(error){
        console.log(error)
        res.json({status:false})
    }
}
function suspendThesis(req,res){
    if(typeof(req.session.instructorinfo)==='undefined'|| req.session.instructorinfo===null){
        res.json({status:false,message:"instructor session does not exist"})
    }
    else{
        Thesis.findOneAndUpdate({_id:req.body.thesisid},{status:'Suspended',progress:0})
            .then(result=>{
                Student.updateMany({thesisid:req.body.thesisid},{thesisid:''})
                    .then(r=>{
                        console.log("Removed")
                        res.json({status:true})
                    })
                    .catch(err=>{
                        console.log(err)
                        res.json({status:false})
                    })
            })
            .catch(err=>{
                console.log(err)
                res.json({result:false})
            })
    }
    
}
function proposeThesis(req,res){
    if(typeof(req.session.instructorinfo)==='undefined' || req.session.instructorinfo===null){
        res.json({message:"Instructor session does not exist"})
    }
    else{
        const pd = new PendingThesis({
            name: req.body.thesisname,
            instructorid: req.session.instructorinfo._id,
            category: req.body.category,
            description: req.body.description,
        })
        pd.save()
            .then(document=>{
                res.json({doc: document})
            })
    }
}
function getAllPendingThesis(req,res){
    PendingThesis.find()
        .then(docs=>{
            // console.log(docs)
            res.json({theses:docs})
        })
        .catch(err=>{
            console.log(err)
            res.json({message:"There is no avaiable thesis"})
        })
}
function getAllRelatedToPendingThesis(req,res){
    PendingThesis.findOne({_id:req.body.thesisid})
        .then(pt=>{
            Instructor.findOne({_id:pt._doc.instructorid})
                .then(ins=>{
                    res.json({thesis:pt._doc,instructor:ins._doc})
                })
        })
        .catch(err=>{
            console.log(err)
            res.json({message:"Fail to retrive data"})
        })
}
function JoinThesis(req,res){
    try{
        if(typeof(req.session.studentinfo)==='undefined' || req.session.studentinfo === null){
            res.json({confirm:false})
        }
        else{
            PendingStudent.exists({studentid:req.session.studentinfo._id,
                                thesisid:req.body.thesisid})
                .then(check=>{
                    if(check){
                        res.json({})
                    }
                    else{
                        const temp = new PendingStudent({
                            thesisid:req.body.thesisid,
                            studentid:req.session.studentinfo,
                        })
                        temp.save()
                            .then(doc=>{
                                res.json({confirm:true})
                            })
                    }
                })
            
        }
    }
    catch(err){
        console.log(err)
        res.json({confirm:false,error:err})
    }
}
function CancelRequest(req,res){
    try{
        if(typeof(req.session.studentinfo)==='undefined'||req.session.studentinfo===null){
            res.json({confirm:false})
        }
        else{
            PendingStudent.deleteOne({thesisid:req.body.thesisid,studentid:req.session.studentinfo._id})
                .then(()=>{
                    res.json({confirm:true})
                })
        }
    }
    catch(err){
        console.log(err)
        res.json({error:err,confirm:false})
    }
}
function getPendingTheses(req,res){
    try{
        if(typeof(req.session.instructorinfo)==='undefined'||req.session.instructorinfo===null){
            res.json({})
        }
        else{
            PendingThesis.find({instructorid:req.session.instructorinfo._id})
                .then(async (docs)=>{
                    var stdBatch=[]
                    for(let doc of docs){
                        let temp = await PendingStudent.find({thesisid:doc._doc._id}).populate('studentid')
                        try{
                            console.log(temp)
                            stdBatch.push(temp)
                        }
                        catch(ex){
                            //For collections that have no student
                        }
                    }
                    res.json({theses:docs,confirm:true, students:stdBatch})
                })
        }
    }
    catch(err){
        console.log(err)
        res.json({confirm:false})

    }
}
function stdPendingThesis(req,res){
    // This is currently not in used
    try{
        if(typeof(req.session.instructorinfo)==='undefined'||req.session.instructorinfo===null){
            res.json({})
        }
        else{
            PendingThesis.find({instructorid:req.session.instructorinfo._id})
                .then(docs=>{
                    res.json({theses:docs,confirm:true})
                })
        }
    }
    catch(err){
        console.log(err)
        res.json({confirm:false})
    }
}
function confirmRequest(req,res){
    try{
        if(typeof(req.session.instructorinfo)==='undefined' || req.session.instructorinfo===null){
            res.json({confirm:false,message:'Session not found'})
        }
        else{
            const t = new Thesis({
                _id: req.body.thesis._id,
                name: req.body.thesis.name,
                category: req.body.thesis.category,
                instructorid: req.session.instructorinfo._id,
                description: req.body.thesis.description,
                progress: 0,
                status: 'on going',
            })
            t.save()
                .then(async () => {
                    for(let id of req.body.students){
                        await Student.findOneAndUpdate({id:id[0]},{thesisid:req.body.thesis._id})
                        await PendingStudent.deleteMany({studentid:id[1]})
                    }
                    await PendingThesis.findByIdAndDelete(req.body.thesis._id)
                    res.json({confirm:true})
                })
        }
    }
    catch(err){
        console.log(err)
        res.json({confirm:false})
    }
}
async function removePropose(req,res){
    try{
        if(typeof(req.session.instructorinfo) === 'undefined' || req.session.instructorinfo===null){
            res.json({message:"Session not found"})
        }
        else{
            await PendingThesis.findByIdAndDelete(req.body.thesis)
            await PendingStudent.deleteMany({thesisid:req.body.thesis})
            res.json({confirm:true})
        }
    }
    catch(err){
        console.log(err)
        res.json({confirm:false})
    }
    // PendingThesis.deleteOne(req.body.thesis)
}
module.exports = {
    setStudentSession,
    editStudent,
    setInstructorSession,
    getCategories,
    get1Student,
    addThesis,
    getInstructorThesis,
    getStudents,
    getTasks,
    addTasks,
    getThesisByID,
    submitTasks,
    confirmTask,
    addScore,
    getScore,
    editInstructorProfile,
    suspendThesis,
    proposeThesis,
    getAllPendingThesis,
    getAllRelatedToPendingThesis,
    JoinThesis,
    CancelRequest,
    getPendingTheses,
    stdPendingThesis,
    confirmRequest,
    removePropose,
}