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

mongoose.connect(databseURI)
    .then(()=>{
        app.listen(port,() => {console.log("Server is running on port 5000")})
    })
