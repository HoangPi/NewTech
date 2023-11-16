const express = require('express');
const router = express.Router();
const {confirmTask} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    next()
})

router.post("/",confirmTask)

module.exports = router;