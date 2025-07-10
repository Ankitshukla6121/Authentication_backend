import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'


const router= express.Router();


// register api


router.post("/register",async(req,res)=>{

    const {username,email,password}= req.body;
    const userExists= await User.findOne({email});
    if(userExists){
        return res.status(400).json({message:"User already exixts"});
    }
    const hashedPassword= await bcrypt.hash(password,10);
    const newUser= new User({
        username, email, password:hashedPassword
    });
    await newUser.save();
    res.status(200).json({message:"User registered successfully"});
})



// login api

router.post("/login", async(req,res)=>{
    const {email, password}= req.body;

    const userExists= await User.findOne({email})
    if(!userExists){
        return res.status(400).json({message:"Invalid credentials"});

    }

    const isMatch = await bcrypt.compare(password, userExists.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid credentails"});
    }

    const token = jwt.sign({id:userExists._id},process.env.JWT_SECRET,{expiresIn:'1d'});

    res.status(200).json({token,user:{id:userExists._id, username:userExists.username,email:userExists.email}});


})

export default router;