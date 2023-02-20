# Mongo DB

```JSON
"mongoose": "^5.11.8",
```
## Document Database
A record in MongoDB is a document, which is a data structure composed of field and value pairs. MongoDB documents are similar to JSON objects. The values of fields may include other documents, arrays, and arrays of documents.

## The advantages of using documents are:
* Documents correspond to native data types in many programming languages.
* Embedded documents and arrays reduce need for expensive joins.
* Dynamic schema supports fluent polymorphism.

## High Performance
MongoDB provides high performance data persistence. In particular,
Support for embedded data models reduces I/O activity on database system.
Indexes support faster queries and can include keys from embedded documents and arrays.

## High Availability
MongoDB's replication facility, called replica set, provides:
* automatic failover
* data redundancy.

A replica set is a group of MongoDB servers that maintain the same data set, providing redundancy and increasing data availability.

## Horizontal Scalability
MongoDB provides horizontal scalability as part of its core functionality:
* Sharding distributes data across a cluster of machines.

## Create mongo db connection
```javascript
// app.js
// mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
// const db = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE);
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
```
## Create schema 
Add keys and and assign that schema to model.

```javascript
// tourModel.js
const mongoose = require('mongoose');
const toursSchema = new mongoose.Schema({
    name : { 
        type : String , 
        require: [true, 'name is required'], 
        unique :true
    },
    rating : Number,
    price : Number
})
const Tour = mongoose.model('Tour',toursSchema);
module.exports = Tour;
```
## Use model in controller
Add model to controller and use method to to CRUD operations.

```javascript
// toursController.js
const Tour = require('../model/tourModel');
exports.getAllTour = async(req,res)=>{
    const allTour = await Tour.find();
    res.status(200).json({
        status:'success',
        length:allTour.length,
        data: allTour
    })
};
exports.addTour = async (req, res) =>{
    const testTour = new Tour(req.body);
    testTour.save().then(doc=> {
        res.status(200).json({
            status:'success',
            data: doc
        })
    }).catch(e=> console.log(e));
}
```