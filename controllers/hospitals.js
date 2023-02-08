const Hospital = require('../models/Hospital');


//@desc     Get all hospitals
//@route    GET /api/v1/hospitals
//@access   public
exports.getHospitals = (req, res, next)=>{
    Hospital.find()
    .then(hospitals=>{
        if(!hospitals){
            res.status(400).json({success:false});
            return ;
        }
        res.status(200).json({success:true, data:hospitals, count:hospitals.length});
    })
    .catch(err=>{
        res.status(400).json({success:false, msg: err.message});
    })
    
}

//@desc     Get hospital
//@route    GET /api/v1/hospitals/:id
//@access   public
exports.getHospital = (req, res, next)=>{
    Hospital.findById(req.params.id)
    .then(hospital=>{
        if(!hospital){
            res.status(400).json({success:false});
            return ;
        }
        res.status(200).json({success:true, data:hospital});
    })
    .catch(err=>{
        res.status(400).json({success:false, msg: err.message});
    })
}

//@desc     Create hospital
//@route    POST /api/v1/hospitals
//@access   private
exports.createHospital = (req, res, next)=>{
    console.log(req.body);
    Hospital.create(req.body)
    .then(data=>{
        res.status(200).json({success:true, data: data});
    })
    .catch(err=>{
        res.status(400).json({success:false, msg: err.message});
    });
}

//@desc     Update hospitals
//@route    PUT /api/v1/hospitals/:id
//@access   private
exports.updateHospital = (req, res, next)=>{
    Hospital.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    .then(hospital=>{
        if(!hospital){
            res.status(400).json({success:false});
            return ;
        }
        res.status(200).json({success:true, data: hospital});
    })
    .catch(err=>{
        res.status(400).json({success:false, msg: err.message});
    });
}

//@desc     Delete hospitals
//@route    DELETE /api/v1/hospitals/:id
//@access   private
exports.deleteHsopital = (req, res, next)=>{
    Hospital.findByIdAndDelete(req.params.id)
    .then(hospital=>{
        if(!hospital){
            res.status(400).json({success:false});
            return ;
        }
        res.status(200).json({success:true, data: {}});
    })
    .catch(err=>{
        res.status(400).json({success:false, msg: err.message});
    });
}
