const express = require('express');
const router = express.Router();
const {JoinThesis} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    next()
})

router.post("/",JoinThesis)

module.exports = router;