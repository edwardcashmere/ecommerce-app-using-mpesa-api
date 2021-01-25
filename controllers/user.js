const { json } = require("express");
const User = require("../models/user");


exports.userById = async(req,res,next,id)=>{

    try {
        const user = await User.findById(id)
        if(!user) return res.status(400).json({error:"user not found"})

        req.profile = user

        next()

    } catch (error) {
        console.error(error)
    }


}

exports.read =async(req,res)=>{
    try {
        req.profile.hashed_password = undefined
        req.profile.salt = undefined

        return res.json(req.profile)
        
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
}

exports.update =async(req,res)=>{

    try {

        let user = await User.findByIdAndUpdate({_id: req.profile._id},{$set: req.body},{new : true})
        if(!user) return res.status(400).json({error: "user not found"})

        res.json({user})
    } catch (error) {
        res.status(500).json({error: "Internal server error"})

        
    }

}
