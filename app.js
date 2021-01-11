const express = require('express');
const tourRouter = require('./routes/tourRouters');
const userRouter = require('./routes/userRouters');
//mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
//const db = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE);
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path : './config.env'});
const db = process.env.DATABASE_LOCAL;
mongoose.connect(db,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then((con)=>{
    console.log("db connected");
});
app.use(express.json());
app.use((req,res,next)=>{
    console.log('middleware',req.url);
    next();
});
app.use('/api/v2/tour',tourRouter);
app.use('/api/v2/user',userRouter);
app.listen(3000,()=>{
    console.log('application running');
});