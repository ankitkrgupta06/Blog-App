const express=require('express');
const router=express.Router();

router.get('',(req,res)=>{
  const locals={
    title:"Node Js Blog",
    description:"Simple Blog Created with Node, React and MongoDB"
  }
  res.render('index',locals);
})

router.get('/about',(req,res)=>{
  res.render('about');
})


module.exports=router;