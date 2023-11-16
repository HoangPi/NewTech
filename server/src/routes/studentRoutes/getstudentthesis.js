const express = require('express');
const router = express.Router();
const {getThesisByID} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    next()
})

router.post("/",getThesisByID)

module.exports = router;