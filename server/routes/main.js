const express=require('express');
const router=express.Router();
const postModel=require('../models/postModel');

router.get('',async (req,res)=>{
  const locals={
    title:"Node Js Blog",
    description:"Simple Blog Created with Node, React and MongoDB"
  }
  try {
    let perPage=3;
    let page=req.query.page||1;

    const data=await postModel.aggregate([{$sort:{createdAt:-1}}])
    .skip(perPage*page-perPage)
    .limit(perPage)
    .exec();

    const count=await postModel.countDocuments();
    const nextPage=parseInt(page)+1;
    const hasNextPage=nextPage<=Math.ceil(count/perPage);

    res.render('index',{locals,data,current:page,nextPage:hasNextPage?nextPage:null,currentRoute:'/'});
  } catch (error) {
    console.log(error)
  }
})

router.get('/post/:id',async(req,res)=>{
  try {
    const param=req.params.id;
    const data=await postModel.findById({_id : param});
    const locals={
      title:data.title,
      description:"This is a blog"
    }
    res.render('post',{locals,data,currentRoute:`/post/${param}`});
  } catch (error) {
    console.log(error)
  }
})

router.post('/search',async (req,res)=>{
  try {
    const locals={
      title:"Search",
      description:"Simple Blog created with NodeJs and MongoDB"
    }
    let searchTerm=req.body.searchTerm;
    const searchNoSpecialChar=searchTerm.replace(/[^a-zA-Z0-9 ]/g,"")
    const data=await postModel.find({
      $or:[
        {title:{$regex: new RegExp(searchNoSpecialChar,'i')}},
        {body:{$regex: new RegExp(searchNoSpecialChar,'i')}}
      ]
    });
    res.render("search",{locals,data,currentRoute:'/'});
  } catch (error) {
    console.log(error);
  }
})



router.get('/about',(req,res)=>{
  res.render('about',{currentRoute:'/about'});
})


module.exports=router;