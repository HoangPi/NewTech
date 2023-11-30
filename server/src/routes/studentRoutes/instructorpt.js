const express = require('express');
const router = express.Router();
const {getAllRelatedToPendingThesis} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    next()
})

router.post("/",getAllRelatedToPendingThesis)

module.exports = router;