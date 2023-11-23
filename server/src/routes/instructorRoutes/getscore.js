const express = require('express');
const router = express.Router();
const {getScore} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    next()
})

router.post("/",getScore)

module.exports = router;