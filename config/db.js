const mongoose = require('mongoose');
const mongo_uri = process.env.MONGO_URI;

const connectDB = async ()=> {
try {
   const conn =await  mongoose.connect(`${mongo_uri}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
   })
   console.log(`mongo db connected to ${conn.connection.host}`.cyan.underline.bold)
    
} catch (error) {
    console.log(`error connecting to the database ${error.message}`)
    process.exit(1)
    
}
}

module.exports = connectDB