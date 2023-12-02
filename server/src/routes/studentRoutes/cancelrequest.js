const express = require('express');
const router = express.Router();
const {CancelRequest} = require("../../controllers/databaseHandler.js")
const app = require('../../server.js')

router.use((req,res,next)=>{
    next()
})

router.post("/",CancelRequest)

module.exports = router;