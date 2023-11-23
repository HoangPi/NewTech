const express = require('express');
const router = express.Router();
const {addScore} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    next()
})

router.post("/",addScore)

module.exports = router;