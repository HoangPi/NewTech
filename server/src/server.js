const express = require('express')
const bodyParser = require('body-parser');
const databseURI = require('./databse/databaseURI.js')
const mongoose = require("mongoose")
const session = require('express-session')

const getStudent = require('./routes/studentRoutes/getStudent.js')
const editstudent = require('./routes/studentRoutes/editStudent.js')
const getstudentsession = require('./routes/studentRoutes/getStudentSession.js')
const setinstructorsession = require('./routes/instructorRoutes/setinstructorsession.js')
const signout = require('./routes/signout.js')
const getinstructorsession = require('./routes/instructorRoutes/getinstructorsession.js')
const getcategories = require('./routes/instructorRoutes/getcategories.js')
const get1Student = require('./routes/studentRoutes/get1student.js')
const addthesis = require('./routes/instructorRoutes/addthesis.js')
const getinstructorthesis = require('./routes/instructorRoutes/getinstructorthesis.js')
const setthesis = require('./routes/instructorRoutes/setthesissession.js')
const getthesis = require('./routes/instructorRoutes/getthesissession.js')
const getstudentsthesis = require('./routes/instructorRoutes/getstudents.js')
const gettasksinthesis = require('./routes/instructorRoutes/gettasksinthesis.js')
const addtasks = require('./routes/instructorRoutes/addtasks.js')
const studentthesis = require('./routes/studentRoutes/getstudentthesis.js')
const submit = require('./routes/studentRoutes/submit.js')
const confirmsubmission = require('./routes/instructorRoutes/confirmsubmission.js')
const addscore = require('./routes/instructorRoutes/addscore.js')
const getscore = require('./routes/instructorRoutes/getscore.js')
const instructorinfo = require('./routes/instructorRoutes/editinstructorprofile.js')
const suspend = require('./routes/instructorRoutes/suspend.js')
const propose = require('./routes/instructorRoutes/propose.js')
const getpts = require('./routes/studentRoutes/getpts.js')
const instructorpt = require('./routes/studentRoutes/instructorpt.js')
const jointhesis = require('./routes/studentRoutes/jointhesis.js')
const cancelrequest = require('./routes/studentRoutes/cancelrequest.js')
const getpendingtheses = require('./routes/instructorRoutes/getpendingtheses.js')
const studentipt = require('./routes/instructorRoutes/studentipt.js')
const confirmrequest = require('./routes/instructorRoutes/confirmrequest.js')
const removepropose = require('./routes/instructorRoutes/removepropose.js')
const getinstructors = require('./routes/instructorRoutes/getinstructors.js')
const defend = require('./routes/instructorRoutes/defend.js')
const getdefend = require('./routes/instructorRoutes/getdefend.js')
const getinstructordefense = require('./routes/instructorRoutes/getinstructordefense.js')

const app = express()
const port = 5000

app.use(session({
    secret: 'my-secret', // a secret string used to sign the session ID cookie
    resave: false, // don't save session if unmodified
    saveUninitialized: false // don't create session until something stored
}))
app.use(bodyParser.json());
app.use((req,res,next)=> {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use("/setstudentsession",getStudent)
app.use("/editstudent",editstudent)
app.use("/getstudentsession", getstudentsession)
app.use('/setinstructorsession',setinstructorsession)
app.use('/signout',signout)
app.use('/getinstructorsession',getinstructorsession)
app.use('/getcategories',getcategories)
app.use('/getstudent',get1Student)
app.use('/addthesis',addthesis)
app.use('/getthesisbyinstructorid',getinstructorthesis)
app.use('/setthesissession',setthesis)
app.use('/getthesissession',getthesis)
app.use('/getstudentsinthesis',getstudentsthesis)
app.use('/gettasksinthesis',gettasksinthesis)
app.use('/addtasks',addtasks)
app.use('/studentthesis', studentthesis)
app.use('/submit',submit)
app.use('/confirmsubmission',confirmsubmission)
app.use('/score',addscore)
app.use('/getscore',getscore)
app.use('/instructorinfo',instructorinfo)
app.use('/suspend',suspend)
app.use('/propose',propose)
app.use('/getpts',getpts)
app.use('/instructorpt',instructorpt)
app.use('/jointhesis',jointhesis)
app.use('/cancelrequest',cancelrequest)
app.use('/getpendingtheses',getpendingtheses)
app.use('/studentipt',studentipt)
app.use('/confirmrequest',confirmrequest)
app.use('/removepropose', removepropose)
app.use('/getinstructors',getinstructors)
app.use('/defend',defend)
app.use('/getdefend',getdefend)
app.use('/getinstructordefense',getinstructordefense)

mongoose.connect(databseURI)
    .then(()=>{
        app.listen(port,() => {console.log("Server is running on port 5000")})
    })
