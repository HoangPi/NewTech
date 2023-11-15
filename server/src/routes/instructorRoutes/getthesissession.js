const express = require('express');
const router = express.Router();
const app = require('../../server.js')

router.use((req,res,next)=>{
    // if(typeof(req.session.instructorinfo)!=='undefined'){
    //     res.json({instructorinfo: req.session.instructorinfo,status:true})
    //     return
    // }
    res.json({thesis:req.session.thesisList[req.session.thesisIndex]})
    // next()
})

// router.post("/",setStudentSession)

module.exports = router;