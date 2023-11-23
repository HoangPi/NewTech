const express = require('express');
const router = express.Router();
const {suspendThesis} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    next()
})

router.post("/",suspendThesis)

module.exports = router;