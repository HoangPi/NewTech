const express = require('express');
const router = express.Router();
const {get1Student} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    // req.session.instructorinfo=null
    next()
})

router.post("/",get1Student)

module.exports = router;