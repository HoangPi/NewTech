const express = require('express');
const router = express.Router();
const {setInstructorSession} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    req.session.studentinfo=null
    next()
})

router.post("/",setInstructorSession)

module.exports = router;