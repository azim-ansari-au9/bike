const mongoose = require("mongoose");
const studentModel = require("../model/studenModel");

module.exports = {
	addStudent: async (req, res) => {
		try {
			const studentData = await studentModel.create(req.body);
			return res
				.status(201)
				.json({ message: "Student Added Successfully", studentDetails: studentData });
		} catch (err) {
			console.log("eerpr", err);
			res.status(500).json({ message: "Server Error" });
		}
	},
	studentUpdate: async (req, res) => {
		try {
			const studentId = req.params.Id;
			const { name, email, ocupation, phoneNumber, designation } = req.body;
			const studentData = await studentModel.findByIdAndUpdate(
				{ _id: mongoose.Types.ObjectId(studentId) },
				{ name, email, ocupation, phoneNumber, designation },
				{ new: true }
			);
			return res
				.status(200)
				.json({ message: "Student Updated Successfully", updatedstudentDetails: studentData });
		} catch (err) {
			res.status(500).json({ message: "Server Error" });
		}
	},
	studentDetails: async (req, res) => {
		try {
			const studentId = req.params.Id;
			const studentData = await studentModel.findOne({ _id: mongoose.Types.ObjectId(studentId) });
			return res
				.status(200)
				.json({ message: "Student Data Fetched successfully", studentDetails: studentData });
		} catch (err) {
			res.status(500).json({ message: "Server Error" });
		}
	},
	studentDelete: async (req, res) => {
		try {
			const studentId = req.params.Id;
			const studentData = await studentModel.findOneAndDelete({
				_id: mongoose.Types.ObjectId(studentId),
			});
			return res
				.status(200)
				.json({ message: "Student Deleted successfully", studentDetails: studentData });
		} catch (err) {
			res.status(500).json({ message: "Server Error" });
		}
	},
	allstudentList: async (req, res) => {
		try {
			const studentDetails = await studentModel.find();
			return res.status(200).json({ message: "All Students List", studentDetails });
		} catch (error) {
			res.status(500).json({ message: "Server Error" });
		}
	},
	addParent: async (req, res) => {
		try {
			const { parents } = req.body;
			const studentId = req.params.Id;
			const studentData = await studentModel.findByIdAndUpdate(
				{ _id: mongoose.Types.ObjectId(studentId) },
				{ $addToSet: { parents: parents } },
				{ new: true }
			);
			return res
				.status(200)
				.json({ message: "corresponding student’s parents added", studentData });
		} catch (err) {
			res.status(500).json({ message: "Server Error" });
		}
	},
	allParentsOfStudent: async (req, res) => {
		const studentId = req.params.Id;
		const details = await studentModel.findOne({ _id: mongoose.Types.ObjectId(studentId) });
		const data = details.parents;
		return res
			.status(200)
			.json({ message: "All parents Id's are here", correspondingParents: data });
	},
};
