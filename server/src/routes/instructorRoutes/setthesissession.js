const express = require('express');
const router = express.Router();
const app = require('../../server.js')

router.use((req,res,next)=>{
    try{
        req.session.thesisIndex=req.body.id
        console.log(req.body.id)
        res.json({status:true})
    }
    catch{
        res.json({status:false})
    }
    
    // next()
})

// router.post("/",setStudentSession)

module.exports = router;