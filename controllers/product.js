const Product = require('../models/product');
const fs = require('fs');
const formidable = require('formidable');
const _ = require('lodash');
const { errorHandler } = require('../helpers/dberrors');
const {v4: uuidv4} = require("uuid");
const resizeImg = require('resize-img');
const locus = require('locus');


exports.create=(req,res)=>{
    let form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err,fields,files)=>{
        if(err){
            return res.status(400).json({error: "Incoming files not saved"})
        }
        const {name ,description, category, price,quantity,shipping} =fields
        if( !name|| !description|| !category || !price|| !quantity || shipping ===""){
            return res.status(400).json({error: " Please ensure all fields are filled"})
        }
        let product = new Product({name,description,category,price,quantity, shipping,user: req.profile._id})
        //check if photo is larger than 1000000
        if(files.photo){
            if(files.photo.size > 1000_000)return res.json({error: " files size too large"})
           // console.log(fs.readFileSync(files.photo.path))
            product.photo.data= fs.readFileSync(files.photo.path);
            product.photo.contentType= files.photo.type
        }

        product.save((err,result)=>{
            if(err) return res.status(400).json({error: errorHandler(err) })
            res.status(200).json({result})
        })
    })



}

exports.productById = async(req,res,next,id)=>{
    try {
        const product = await Product.findById(id);
        if(!product) return res.status(400).json({error: " Product not found"});
        
        req.product=product
        next();
    } catch (error) {
        res.status(400).json({error: "something went wrong"})
        
    }
}

exports.read = async(req,res)=>{
    try {
        req.product.photo= undefined

        res.status(201).json(req.product)
        
    } catch (error) {
        res.status(400).json({error: "something went wrong"})
        
    }
}

exports.remove=async (req,res)=>{

    try {
    const product = req.product
    if (req.product.user.toString() !== req.profile._id.toString()) return res.status(400).json({error: "prohibited action"}) 
    await product.remove()

    res.json({msg:'product deleted'})
        
    } catch (error) {
        res.status(500).json({error: "internal server error"})
        
    }

}

exports.update=(req,res)=>{
    let form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err,fields,files)=>{
        if(err){
            return res.status(400).json({error: "Incoming files not saved"})
        }
        const {name ,description, category, price,quantity,shipping} =fields
        if( !name|| !description|| !category || !price|| !quantity || shipping ===""){
            return res.status(400).json({error: " Please ensure all fields are filled"})
        }

        if(req.profile._id.toString() !== req.product.user.toString()) return res.status({error: "Acces denied you dont own this product"})
        let product = req.product
        product = _.extend(product, fields)
        //check if photo is larger than 1000000
        if(files.photo){
            if(files.photo.size > 1000_000)return res.json({error: " files size too large"})
           // console.log(fs.readFileSync(files.photo.path))
            product.photo.data= fs.readFileSync(files.photo.path);
            product.photo.contentType= files.photo.type
        }

        product.save((err,result)=>{
            if(err) return res.status(400).json({error: errorHandler(err) })
            res.status(200).json({result})
        })
    })



}


/*
*sell on arrival
by sell=/products?sortBy=sold&order=desc&limit=4
by arrival =/products?sortBy=createdAt&order=asc&limit=4
if no params all products are returned
*/

exports.list = async(req,res)=>{
    let sortBy = req.query.sortBy ? req.query.sortBy: '_id';
    let order = req.query.order ? req.query.order : 'asc';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6 ;

    try {
        let product = await Product.find()
                                    .select("-photo")
                                    .populate('category')
                                    .sort([[sortBy,order]])
                                    .limit(limit)
        if(!product) return res.status(400).json({error: "product not found"})
        res.send(product)
        
    } catch (error) {
        //console.log(error)
        res.status(500).json({error: "Internal server error"})
        
    }
}

exports.listRelated = async(req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 4;
   // console.log(req.product)

    try {
        let products = await Product.find({_id: {$ne: req.product}, category: req.product.category})
        .limit(limit)
        .populate('category', '_id name')

        if(!products)return res.status(400).json({error: "products not found"})

        res.send(products)
        
    } catch (error) {
        //console.log(error)
        res.status(500).json({error: "Internal server error"})

        
    }




}


//list all products under a certain category
exports.listCategory = async(req,res)=>{
    try {
      //  console.log(categories)

        const products = await Product.distinct("category")
        //eval(locus)
        if(!products)return res.status(400).json({error: "no products found"});

        res.json(products)
        
    } catch (error) {
       // console.log(error)
        res.status(500).json({error: "Internal server error"})

        
    }



    // Product.distinct("category",{},(err,category)=>{
    //     if(err){
    //         return res.status(400).json({error: 'categories not found'})
    //     }
    //     res.json(category)
    // })


}

exports.listSearch = async(req,res)=>{
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id' ;
    let order =  req.body.order ? req.body.order : 'desc' ;
    let limit = req.body.limit ? parseInt(req.body.limit) : 100 ;
    let skip = parseInt(req.body.skip) ;
    let findArgs ={}

    for (let key in req.body.filters){
        if(req.body.filters[key].length>0){
            if(key === 'price'){
                //$gte greater than price [0-10]
                //$lte less than
                findArgs[key]={
                    $gte : req.body.filters[key][0],
                    $lte : req.body.filters[key][1]
                }
                }else{
                    findArgs[key] =req.body.filters[key]

            }
        }
    }
       // console.log(findArgs,limit,sortBy,order,skip)
        try {
            const products = await Product.find(findArgs).select('-photo').populate("category").sort([[sortBy,order]]).skip(skip).limit(limit)
            if(products.length<0)return res.status(400).json({error: "no products found "})
            res.json({
                size: products.length,
                products })
        } catch (error) {
            console.log(error)
            res.status(500).json({error: "Internal server error"})

            
        }



    // res.send("search")

}

exports.photo =(req,res,next)=>{
    if(req.product.photo.data){
        res.set('Content-Type', req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }

    next()
}

