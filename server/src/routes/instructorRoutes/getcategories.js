const express = require('express');
const router = express.Router();
const {getCategories} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    next()
})

router.post("/",getCategories)

module.exports = router;