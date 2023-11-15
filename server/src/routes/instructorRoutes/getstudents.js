const express = require('express');
const router = express.Router();
const {getStudents} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    next()
})

router.post("/",getStudents)

module.exports = router;