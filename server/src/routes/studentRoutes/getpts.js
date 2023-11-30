const express = require('express');
const router = express.Router();
const {getAllPendingThesis} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    next()
})

router.post("/",getAllPendingThesis)

module.exports = router;