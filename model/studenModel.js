const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const studentSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		rollNumber: {
			type: Number,
			required: true,
			unique: true,
		},
		standard: {
			type: String,
			required: true,
		},
		section: {
			type: String,
			default: "A",
		},
		parents: [
			{
				type: ObjectId,
				ref: "Parent",
			},
		],
		photoUrl: {
			type: String,
			default: "https://i.ibb.co/NyYpfGD/dp.jpg",
		},
		address: {
			line1: {
				type: String,
			},
			line2: {
				type: String,
			},
			City: {
				type: String,
			},
			State: {
				type: String,
			},
			Country: {
				type: String,
			},
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
