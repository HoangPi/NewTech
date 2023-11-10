const express = require('express')
const bodyParser = require('body-parser');
const databseURI = require('./databse/databaseURI.js')
const mongoose = require("mongoose")
const session = require('express-session')

const getStudent = require('./routes/getStudent.js')
const editstudent = require('./routes/editStudent.js')

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

app.use("/getstudent",getStudent)
app.use("/editstudent",editstudent)
// app.post("/new",(req,res)=>{
//     console.log('recieved')
//     res.json({stat: 200})
//     addNew()
// })
mongoose.connect(databseURI)
    .then(()=>{
        app.listen(port,() => {console.log("Server is running on port 5000")})
    })
