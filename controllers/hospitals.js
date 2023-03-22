const Hospital = require("../models/Hospital");
const VacCenter = require("../models/VacCenter");

//@desc     Get all hospitals
//@route    GET /api/v1/hospitals
//@access   public
exports.getHospitals = async (req, res, next) => {
	let reqQuery = { ...req.query };

	const removedFields = ["select", "sort", "limit", "page"];
	removedFields.forEach((param) => delete reqQuery[param]);

	let queryStr = JSON.stringify(reqQuery);
	queryStr = queryStr.replace(
		/\b(gt|gte|lt|lte|in)\b/g,
		(match) => `$${match}`
	);

	let query = Hospital.find(JSON.parse(queryStr)).populate("appointments");
	if (req.query.select) {
		const fields = req.query.select.split(",").join(" ");
		query = query.select(fields);
	}

	if (req.query.sort) {
		const sortBy = req.query.sort.split(",").join(" ");
		query = query.sort(sortBy);
	} else {
		console.log(typeof hospitals);
		query = query.sort("-createdAt");
	}

	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 25;
	const start = (page - 1) * limit;
	const end = page * limit;

	try {
		const total = await Hospital.countDocuments();
		query = query.skip(start).limit(limit);
		console.log(page, limit, start, end);
		const hospitals = await query;
		const pagination = {};
		if (end < total) {
			pagination.next = {
				page: page + 1,
				limit,
			};
		}
		if (start > 0) {
			pagination.prev = {
				page: page - 1,
				limit,
			};
		}
		if (!hospitals) {
			res.status(400).json({ success: false });
			return;
		}
		res.status(200).json({
			success: true,
			count: hospitals.length,
			pagination,
			data: hospitals,
		});
	} catch (err) {
		res.status(400).json({ success: false, msg: err.message });
	}
};

//@desc     Get hospital
//@route    GET /api/v1/hospitals/:id
//@access   public
exports.getHospital = (req, res, next) => {
	Hospital.findById(req.params.id)
		.populate("appointments")
		.then((hospital) => {
			if (!hospital) {
				res.status(400).json({ success: false });
				return;
			}
			res.status(200).json({ success: true, data: hospital });
		})
		.catch((err) => {
			res.status(400).json({ success: false, msg: err.message });
		});
};

//@desc     Create hospital
//@route    POST /api/v1/hospitals
//@access   private
exports.createHospital = (req, res, next) => {
	console.log("create a new hospital");
	console.log(req.body);
	Hospital.create(req.body)
		.then((data) => {
			res.status(200).json({ success: true, data: data });
		})
		.catch((err) => {
			res.status(400).json({ success: false, msg: err.message });
		});
};

//@desc     Update hospitals
//@route    PUT /api/v1/hospitals/:id
//@access   private
exports.updateHospital = (req, res, next) => {
	Hospital.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	})
		.then((hospital) => {
			if (!hospital) {
				res.status(400).json({ success: false });
				return;
			}
			res.status(200).json({ success: true, data: hospital });
		})
		.catch((err) => {
			res.status(400).json({ success: false, msg: err.message });
		});
};

//@desc     Delete hospitals
//@route    DELETE /api/v1/hospitals/:id
//@access   private
exports.deleteHsopital = async (req, res, next) => {
	try {
		const hospital = await Hospital.findById(req.params.id);
		if (!hospital) {
			res.status(400).json({ success: false });
		}
		hospital.remove();
		res.status(200).json({ success: true, data: {} });
	} catch (err) {
		res.status(400).json({ success: false, msg: err.message });
	}
};

//@desc     Get vaccine centers
//@route    GET /api/v1/hospitals/vacCenters/
//@access   public
exports.getVacCenters = async (req, res, next) => {
	VacCenter.getAll((err, data) => {
		if (err) {
			res.status(500).send({
				message:
					err.message ||
					"error has occured while retriveign vaccine centers",
			});
			return;
		}
		res.status(200).send(data);
	});
};
