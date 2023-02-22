const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/auth");
const {
	createHospital,
	deleteHsopital,
	getHospital,
	getHospitals,
	updateHospital,
} = require("../controllers/hospitals");

router
	.route("/")
	.get(getHospitals)
	.post(protect, authorize("admin"), createHospital);

router
	.route("/:id")
	.get(getHospital)
	.put(protect, authorize("admin"), updateHospital)
	.delete(protect, authorize("admin"), deleteHsopital);

module.exports = router;
