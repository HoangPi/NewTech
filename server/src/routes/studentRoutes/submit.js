const express = require('express');
const router = express.Router();
const {submitTasks} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    next()
})

router.post("/",submitTasks)

module.exports = router;