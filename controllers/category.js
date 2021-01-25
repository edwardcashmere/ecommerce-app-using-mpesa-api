const { errorHandler } = require('../helpers/dberrors');
const Category = require("../models/category");


exports.create =async(req,res)=>{
    try {
        const category= await new Category(req.body);
        await category.save()
        res.status(201).json({category})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({error: errorHandler(error)})
        
        
    }
}

exports.categoryId=async(req,res,next,id)=>{
    try {
        const category = await Category.findById(id)
        if(!category) return res.status(400).json({error: " category does not exist"})
        req.category = category

        next()

    } catch (error) {
        
    }
}

exports.list=async (req,res)=>{
    try {
    const categories = await Category.find()
    if(!categories)return res.status(400).json({error: "categories does not exist"})
    res.json(categories)
    
        
    } catch (error) {
        res.status(500).json({error: " Internal server error"})
        
    }
    
}


exports.read=async (req,res)=>{
    try {
        const category = req.category
        res.json({category})
        
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
        
    }
    
}


exports.update= async(req,res)=>{
    try {
        const category =req.category
        category.name= req.body.name
        await category.save()
        res.json({category})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "internal server error"})
        
    }
    

    
}

exports.remove=async(req,res)=>{
    try {
        const category = req.category
        await category.remove()
        res.json({msg:"category deleted"})
        
    } catch (error) {
        res.status(500).json({error: "internal server error"})

        
        
    }
    
}