const express = require('express');
const router = express.Router();
const {editInstructorProfile} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    next()
})

router.post("/",editInstructorProfile)

module.exports = router;