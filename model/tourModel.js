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