import express from 'express'
import Post from '../models/Post.js'


import authMiddleware from '../middleware/authMiddleware.js'


const router = express.Router();

// create a post

router.post("/create",authMiddleware,async(req,res)=>{
    const newPost= new Post({...req.body,user:req.user});
    const savedPost =await newPost.save();
    res.status(201).json(savedPost);
})

//  get all the post


router.get("/get",authMiddleware,async(req,res)=>{
    try {
        const posts= await Post.find({user:req.user})
      
        res.json({posts})
    } catch (error) {
        res.json({message:error.message})
        
    }
})

// find by specfic id 

router.get("/get/:id",authMiddleware,async(req,res)=>{
    try {
        const post= await Post.findById(req.params.id);
         return res.status(200).json({post})
    } catch (error) {
         res.json({message:error.message})
    }
})

// update the post 


router.put("/update/:id",authMiddleware, async(req,res)=>{
    try {
        
    const post= await Post.findById(req.params.id);
    if(!post){
        return res.status(403).json({message:"unathorized"});


    }

    const updatedPost= await Post.findByIdAndUpdate(req.params.id, req.body,{new:true});

    res.status(200).json({updatedPost})
    
    return res.status(200).json({message:"updated successfully!", post})
    } catch (error) {
        res.json({message:error.message})
    }

    
})
// delete the post 


router.delete("/delete/:id",authMiddleware,async(req,res)=>{
    try {
         const post= await Post.findById(req.params.id);
    if(!post){
        return res.status(403).json({message:"unathorized"});

    }
    const deletedPost= await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json({message:"post is successfully deleted"});
    } catch (error) {
          res.json({message:error.message})
    }
})
export default router;
