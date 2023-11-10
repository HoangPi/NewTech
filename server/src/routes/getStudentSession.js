const express = require('express');
const router = express.Router();
// const {setStudentSession} = require("../controllers/databaseHandler.js")
const app = require('../server.js')

router.use((req,res,next)=>{
    if(typeof(req.session.studentinfo)!=='undefined'){
        res.json({studentinfo: req.session.studentinfo})
        return
    }
    res.json({error:"Session not found"})
    // next()
})

// router.post("/",setStudentSession)

module.exports = router;