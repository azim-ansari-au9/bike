const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

module.exports = {
	signup: async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(422)
				.json({ code: 422, message: "Parameter missing ", errors: errors.array() });
		}
		try {
			let { name, email, password } = req.body;
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(password, salt);
			await User.findOne({ email: email }, (err, user) => {
				if (err) {
					return res.status(500).json({ code: 500, message: "Internal server error " });
				} else if (!user) {
					userObj = {
						name: name,
						email: email,
						password: hash,
					};
					let user = new User(userObj);
					user.save((err, result) => {
						if (err) {
							return res.status(500).json({ code: 500, message: "Internal server error ", err });
						} else {
							return res
								.status(200)
								.json({ code: 200, message: "User signup Successfully ", result });
						}
					});
				} else {
					return res.status(422).json({ code: 422, message: "User exist Already " });
				}
			});
		} catch (err) {
			res.status(500).json({ code: 500, message: "Server error " });
		}
	},

	login: async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				data: {},
				errors: errors.array(),
				message: "Unable to login",
				code: 400,
			});
		}
		try {
			const user = await User.findOne({ email: req.body.email });
			if (!user) {
				res.status(404).json({ code: 404, message: "User Not Registered" });
			}
			const matchPassword = await bcrypt.compare(req.body.password, user.password);
			console.log("req.body.password:::", req.body.password, "user.password", user.password);
			if (!matchPassword) {
				return res.status(422).json({ code: 422, message: "Incorrect email or password" });
			}
			const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, (err, token) => {
				if (err) {
					res.status(500).json({ code: 500, message: "Internal server error" });
				}
				return res
					.status(200)
					.json({ code: 200, message: "User Logged in Successfully", userData: user, token });
			});
			res.cookie("c", token, { expire: new Date() + 9999 });
		} catch (err) {
			res.status(500).json({ code: 400, message: "Server error" });
		}
	},
};
