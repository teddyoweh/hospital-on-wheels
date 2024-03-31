const nursesModel = require("../models/nurses.model");

async function nursesController(req,res){
    nursesModel.find({}).then((data)=>{
        res.json(data);
    }
    )
    .catch((err)=>{
        res.json(err);
    })

}


module.exports = { nursesController }