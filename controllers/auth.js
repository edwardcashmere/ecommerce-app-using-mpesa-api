const User = require('../models/user');
const { errorHandler } = require('../helpers/dberrors');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


exports.signup = async(req,res)=>{
    let {name, email,password} = req.body;
    try {
         email= await email.toLowerCase()
        let user = await new User({name,email,password});

        await user.save()
        user.salt = undefined
        user.hashed_password= undefined
        res.status(201).json({user})
    } catch (error) {
        console.log(error)
        res.status(400).json({error: errorHandler(error)})
        
    }

}

exports.signin= async(req,res)=>{
    let { name, email, password } =req.body

    try {

         email= await email.toLowerCase()

        //find the user based on model

        const user= await User.findOne({email});
        if(!user) return res.status(400).json({error:"user with this email does not  exist please sign up"})

        // if user is found make sure email and password match

        //authentiacte method in the user model
        if(!user.authenticate(password)) return res.status(400).json({error: "The email and password do not match"})

        //create token 
        const token = await jwt.sign({id: user._id}, process.env.JWT)

        //persist token in cookie

        res.cookie('t',token, {expire: new Date() + 9999})

        return res.status(201).json({token, user})

        
    } catch (error) {
        console.error(error)
        
    }

}

exports.signout = async(req,res)=>{
    res.clearCookie("t")
    res.status(200).json({message: "sign out succesful"})
}


exports.requireAuth = expressJwt({
    secret: process.env.JWT,
    algorithms: ["HS256"], // added later
    userProperty: "auth"
});


exports.isAuth =(req,res,next)=>{

    const user = req.profile && req.auth && req.profile._id == req.auth.id
    if(!user) return res.status(400).json({error:"Access denied"})

    next()
}

exports.isAdmin = (req,res,next)=>{
    if(req.profile.role === 0) return res.status(400).json({error: "Admin access required"})

    next()
}
