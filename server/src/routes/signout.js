const express = require('express');
const router = express.Router();
const app = require('../server.js')

router.use(async (req,res,next)=>{
    //User async function because the res.json may execute before the session is destroyed
    await req.session.destroy()
    res.json({status:true})
    return
    next()
})

// router.post("/",editStudent)

module.exports = router;