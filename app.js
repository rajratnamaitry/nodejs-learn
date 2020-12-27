const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
dotenv.config({ path : './config.env'});

//const db = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE);
const db = process.env.DATABASE_LOCAL;
mongoose.connect(db,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then((con)=>{
    console.log("db connected");
})
const toursSchema = new mongoose.Schema({
    name : { type : String , require: [true, 'name is required'], unique :true},
    rating : Number,
    price : Number
})
const Tour = mongoose.model('Tour',toursSchema);
const testTour = new Tour({
    name : 'The forest hiker',
    rating: 4.7,
    price: 100
});
testTour.save().then(doc=> console.log(doc)).catch(e=> console.log(e));
const app = express();
app.get('/',(req, res)=>{
    res.send('HELLO');
})
app.listen(3000,()=>{
    console.log('application running');
})
//mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb 