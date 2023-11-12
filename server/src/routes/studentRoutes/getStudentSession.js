const express = require('express');
const router = express.Router();
// const {setStudentSession} = require("../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    if(typeof(req.session.studentinfo)!=='undefined'){
        res.json({studentinfo: req.session.studentinfo,status:true})
        return
    }
    res.json({status:false})
    // next()
})

// router.post("/",setStudentSession)

module.exports = router;