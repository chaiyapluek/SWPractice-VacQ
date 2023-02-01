
//@desc     Get all hospitals
//@route    GET /api/v1/hospitals
//@access   public
exports.getHospitals = (req, res, next)=>{
    res.status(200).json({success:true, msg:"Show all hospitals"})
}

//@desc     Get hospital
//@route    GET /api/v1/hospitals/:id
//@access   public
exports.getHospital = (req, res, next)=>{
    res.status(200).json({success:true, msg:`Show hospital ${req.params.id}`})
}

//@desc     Create hospital
//@route    POST /api/v1/hospitals
//@access   private
exports.createHospital = (req, res, next)=>{
    res.status(200).json({success:true, msg:`Update hospital ${req.params.id}`})
}

//@desc     Update hospitals
//@route    PUT /api/v1/hospitals/:id
//@access   private
exports.updateHospital = (req, res, next)=>{
    res.status(200).json({success:true, msg:"Create new hospital"})
}

//@desc     Delete hospitals
//@route    DELETE /api/v1/hospitals/:id
//@access   private
exports.deleteHsopital = (req, res, next)=>{
    res.status(200).json({success:true, msg:`Delete hospital ${req.params.id}`})
}
