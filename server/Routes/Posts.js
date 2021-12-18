var express = require('express')
const { Posts }= require('../models')
var router = express.Router()

console.log(Posts)

router.get('/byID/:id',async (req,res)=>{ 
    const id = req.params.id
    const user= await Posts.findByPk(id)
    res.json(user)
})

router.get('/',async (req,res)=>{
    const list = await Posts.findAll()
    res.json(list)
})


router.post('/',async (req,res)=>{
    await Posts.create(req.body)
    res.json(req.body)
})

router.delete('/:id/delete', async (req, res) => {
    id=req.params.id
    await Posts.destroy({where:{id:id}})
    res.json(id)
  });


module.exports = router