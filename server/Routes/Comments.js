var express = require('express')
const { Comments}= require('../models')
var router = express.Router()


router.get('/:postId',async(req,res)=>{
    postId =req.params.postId
    post = await Comments.findAll({where:{postId:postId}})
    res.json(post)
})
router.post('/',async (req,res)=>{
    await Comments.create(req.body)
    res.json(req.body)
})

router.delete('/:id/delete', async (req, res) => {
    id=req.params.id
    await Comments.destroy({where:{id:id}})
    res.json(id)
  });

  
  
console.log(Comments)
module.exports = router