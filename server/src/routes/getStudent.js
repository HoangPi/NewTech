const express = require('express');
const router = express.Router();
const {getStudentByID} = require("../controllers/databaseHandler.js")
const app = require('../server.js')

router.use((req,res,next)=>{
    if(typeof(req.session.studentinfo)!=='undefined' && req.body.id==req.session.studentinfo.id){
        res.json({studentinfo: req.session.studentinfo})
        return
    }
    next()
})

router.post("/",getStudentByID)

module.exports = router;