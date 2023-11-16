const express = require('express');
const router = express.Router();
const {addTasks} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    next()
})

router.post("/",addTasks)

module.exports = router;