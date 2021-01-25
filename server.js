require('dotenv').config();
const express = require('express');
const colors = require('colors');
const port = process.env.PORT || 8000;
const morgan  = require('morgan');
const app= express();
const cors= require('cors');
const cookieParser= require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');


app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors())


// database connection
connectDB()


//routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);



app.listen(port, ()=>{
    console.log(`server running on port ${port}`.cyan)
})