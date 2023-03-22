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
const appointmentRouter = require("./appointment");
const { getVacCenters } = require("../controllers/hospitals");

router.use("/:hospitalId/appointments", appointmentRouter);

router.route("/vacCenters").get(getVacCenters);

router
	.route("/:id")
	.get(getHospital)
	.put(protect, authorize("admin"), updateHospital)
	.delete(protect, authorize("admin"), deleteHsopital);

router
	.route("/")
	.get(getHospitals)
	.post(protect, authorize("admin"), createHospital);

module.exports = router;
