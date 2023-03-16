const express = require("express");
const {
	getAppointments,
	getAnAppointment,
	createAppointment,
	updateAppointment,
	deleteAppointment,
} = require("../controllers/appointment");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middlewares/auth");

router
	.route("/:id")
	.get(protect, getAnAppointment)
	.put(protect, authorize("admin", "user"), updateAppointment)
	.delete(protect, authorize("admin", "user"), deleteAppointment);

router
	.route("/")
	.get(protect, getAppointments)
	.post(protect, authorize("admin", "user"), createAppointment);

module.exports = router;
