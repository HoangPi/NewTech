const express = require('express');
const router = express.Router();
const {getAllInstructor} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    next()
})

router.post("/",getAllInstructor)

module.exports = router;