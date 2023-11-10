const express = require('express');
const router = express.Router();
const {editStudent} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    next()
})

router.post("/",editStudent)

module.exports = router;