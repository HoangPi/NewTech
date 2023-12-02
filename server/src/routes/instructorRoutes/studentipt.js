const express = require('express');
const router = express.Router();
const {stdPendingThesis} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    next()
})

router.post("/",stdPendingThesis)

module.exports = router;