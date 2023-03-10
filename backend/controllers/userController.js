const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler= require('express-async-handler')
const User = require('../models/userModel')
// authenticate user
// POST api/users/login
const loginUser =asyncHandler( async(req,res)=>{
    const {email,password}=req.body

    // Check for user email
    const user = await User.findOne({email})

    if(user && (bcrypt.compare(password,user.password))){
        res.json({
            name:user.name,
         email: user.email,
         password: user.password,
         token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credentials')
    } 
})


// POST /api/users 
// Register a user
const registerUser = asyncHandler( async(req, res)=>{
    const {name,email, password}= req.body
    if(!name || !email || !password){ 
        res.status(400)
        throw new Error('Please enter all fields')
    } 
    // Check if user exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(password,salt)

    // create  User
    const user= await User.create({
        name,
        email,
        password: hashedPassword
    })
    if(user){
        res.status(201).json({
            _id: user.id, 
            name: user.name, 
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

// Get user data
// GET api/users/me  
const getMe = asyncHandler( async(req,res)=>{
  const  {_id,name,email}= await User.findById(req.user.id)
    res.status(200).json({
        id:_id,
        name,  
        email
    })
})

// Generate JWT
const generateToken= (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}
module.exports={
    registerUser,
    loginUser,
    getMe,
}  