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