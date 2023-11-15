const express = require('express');
const router = express.Router();
const {getTasks} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    next()
})

router.post("/",getTasks)

module.exports = router;