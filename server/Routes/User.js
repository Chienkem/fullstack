var express = require('express')
const {User}= require('../models')
var router = express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post("/registration",async (req,res)=>{
   const {email,password} = req.body
   bcrypt.hash(password, saltRounds,async function(err, hash) {
    // Store hash in your password DB.
    await User.create({
        email:email,
        password:hash,
    })
});
})

router.post("/login",async (req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({where:{email:email}})
    if(!user){
        res.json('Mật khẩu không chính xác')
    }
    bcrypt.compare(password,user.password).then(async (match)=>{
        if(!match){
            res.json('mật khẩu không chính xác')
        }
        else{
            res.json(user)
        }
    })
 
    
 })







module.exports = router