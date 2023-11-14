const express = require('express');
const router = express.Router();
const {addThesis} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    next()
})

router.post("/",addThesis)

module.exports = router;