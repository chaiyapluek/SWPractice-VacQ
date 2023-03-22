const sql = require("../config/vacCenterDB");

const VacCenter = function (vaccenter) {
	this.id = vaccenter.id;
	this.name = vaccenter.name;
	this.tel = vaccenter.tel;
};

VacCenter.getAll = (result) => {
	sql.query("SELECT * FROM vaccenters", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}
		const r = res.map((v) => {
			return {
                ...v,
				id: v.id.toString("utf8"),
			};
		});
		console.log("vac centers: ", r);
		result(null, r);
	});
};

module.exports = VacCenter;
