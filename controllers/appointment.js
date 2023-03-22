const Appointment = require("../models/Appointment");
const Hospital = require("../models/Hospital");

//@desc     Get appointment
//@route    GET /api/v1/appointments
//@access   private
exports.getAppointments = async (req, res, next) => {
	let query;
	if (req.user.role !== "admin") {
		query = Appointment.find({ user: req.user.id }).populate({
			path: "hospital",
			select: "name province tel",
		});
	} else {
		query = Appointment.find().populate({
			path: "hospital",
			select: "name province tel",
		});
	}

	try {
		const appointments = await query;
		res.status(200).json({
			success: true,
			count: appointments.length,
			data: appointments,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: "cannot find appointments",
			error: err.toString(),
		});
	}
};

//@desc     Get a single appointment
//@route    GET /api/v1/appointments/:id
//@access   private
exports.getAnAppointment = async (req, res, next) => {
	try {
		const appointment = await Appointment.findById(req.params.id).populate({
			path: "hospital",
			select: "name province tel",
		});

		if (!appointment) {
			return res
				.status(404)
				.json({ success: false, message: "appointment not found" });
		}

		res.status(200).json({
			success: true,
			data: appointment,
		});
	} catch (err) {
		return res
			.status(500)
			.json({ success: false, message: "cannot find an appointment" });
	}
};

//@desc     Add appointment
//@route    POST /api/v1/hospitals/:hospitalId/appiontment
//@access   private
exports.createAppointment = async (req, res, next) => {
	req.body.user = req.user.id;
	const existedAppt = await Appointment.find({user:req.user.id});
	if (existedAppt.length >= 3 && req.user.role !== "admin") {
		return res.status(400).json({
			success: false,
			message: "already have 3 appointments",
		});
	}
	try {
		req.body.hospital = req.params.hospitalId;
		const hospital = await Hospital.findById(req.body.hospital);
		if (!hospital) {
			return res
				.status(404)
				.json({ success: false, message: "hospital not found" });
		}

		const appointment = await Appointment.create(req.body);
		res.status(200).json({
			success: true,
			data: appointment,
		});
	} catch (err) {
		return res
			.status(500)
			.json({ success: false, message: "cannot create appointment" });
	}
};

//@desc     Update appointment
//@route    PUT /api/v1/appiontment/:id
//@access   private
exports.updateAppointment = async (req, res, next) => {
	try {
		let appointment = await Appointment.findById(req.params.id);
		if (!appointment) {
			return res
				.status(404)
				.json({ success: false, message: "appointment not found" });
		}

		if (
			appointment.user.toString() !== req.user.id &&
			req.user.role !== "admin"
		) {
			return res.status(401).json({
				success: false,
				message: "you are not authorized to update this appointment",
			});
		}

		appointment = await Appointment.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		res.status(200).json({
			success: true,
			data: appointment,
		});
	} catch (err) {
		return res
			.status(500)
			.json({ success: false, message: "cannot update appointment" });
	}
};

//@desc     Delete appointment
//@route    DELETE /api/v1/appiontment/:id
//@access   private
exports.deleteAppointment = async (req, res, next) => {
	try {
		let appointment = await Appointment.findById(req.params.id);
		if (!appointment) {
			return res
				.status(404)
				.json({ success: false, message: "appointment not found" });
		}

		if (
			appointment.user.toString() !== req.user.id &&
			req.user.role !== "admin"
		) {
			return res.status(401).json({
				success: false,
				message: "you are not authorized to delete this appointment",
			});
		}

		await appointment.remove();
		res.status(200).json({
			success: true,
			data: {},
		});
	} catch (err) {
		return res
			.status(500)
			.json({ success: false, message: "cannot delete appointment" });
	}
};
