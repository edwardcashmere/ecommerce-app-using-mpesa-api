 const formatErrors =(errors)=>{
    console.log(errors)
    const values = []
     errors.map(error=> values.push(error.msg))

     return values

}

module.exports={formatErrors}