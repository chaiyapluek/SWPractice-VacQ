const User = require("../models/User");

//@desc     Register user
//@route    POST /api/v1/auth/register
//@access   Public
exports.register = async (req, res, next) => {
	try {
		const { name, email, password, role } = req.body;
		const user = await User.create({
			name,
			email,
			password,
			role,
		});
		// const token = user.getSignedJWTToken();
		// res.status(200).json({ success: true, token });
        sendTokenresponse(user, 200, res);
	} catch (err) {
		res.status(400).json({ success: false });
		console.log(err.stack);
	}
};

//@desc     Login user
//@route    POST /api/v1/auth/login
//@access   Public
exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res
				.status(400)
				.json({ success: false, msh: "Please provide an email and password" });
		}
		const user = await User.findOne({ email }).select("+password");
		if (!user) {
			return res
				.status(400)
				.json({ success: false, msh: "Invalid credentials" });
		}
		console.log(user);
		const isMatch = await user.matchPassword(password);
		if (!isMatch) {
			return res
				.status(400)
				.json({ success: false, msh: "Invalid credentials" });
		}

		// const token = user.getSignedJWTToken();
		// res.status(200).json({ success: true, token });
        sendTokenresponse(user, 200, res);
	} catch (err) {
		res.status(400).json({ success: false });
		console.log(err.stack);
	}
};

//@desc     Get current logged user
//@route    GET /api/v1/auth/me
//@access   Private
exports.getMe = async (req, res, next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        data: user
    })
}


const sendTokenresponse = (user, code, res) => {
	const token = user.getSignedJWTToken();

	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

    if(process.env.NODE_ENV==='production'){
        options.secure = true
    }
    res.status(code).cookie('token',token,options).json({success:true, token});
};
