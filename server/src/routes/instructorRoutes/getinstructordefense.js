const express = require('express');
const router = express.Router();
const {getInstructorDefense} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    next()
})

router.post("/",getInstructorDefense)

module.exports = router;