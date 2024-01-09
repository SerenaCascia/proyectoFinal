const express = require('express');
const router= express.Router();
 
// inicio
router.get('/',(req,res)=>{
    res.status(200).send("Todo correcto")
})

module.exports =router;