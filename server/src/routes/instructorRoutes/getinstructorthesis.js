const express = require('express');
const router = express.Router();
const {getInstructorThesis} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    next()
})

router.post("/",getInstructorThesis)

module.exports = router;