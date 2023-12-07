const express = require('express');
const router = express.Router();
const {getDefenseDate} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    next()
})

router.post("/",getDefenseDate)

module.exports = router;