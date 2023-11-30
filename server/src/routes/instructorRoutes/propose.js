const express = require('express');
const router = express.Router();
const {proposeThesis} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    next()
})

router.post("/",proposeThesis)

module.exports = router;