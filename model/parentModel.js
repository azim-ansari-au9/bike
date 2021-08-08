const mongoose = require("mongoose");
const { objectId } = mongoose.Schema;

const parnetSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: Number,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		designation: {
			type: String,
		},
		ocupation: {
			type: String,
			default: "Farmer",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Parent", parnetSchema);
