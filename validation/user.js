const { validationResult} = require('express-validator');
const {formatErrors} = require('../helpers/validationErrors')
exports.userValidation =(req,res,next)=>{
    


    const errors = validationResult(req);

    if (!errors.isEmpty()){
       return  res.status(400).send(formatErrors(errors.array()))
    }
    next()
}

