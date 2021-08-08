const mongoose = require("mongoose");
const ParentModel = require("../model/parentModel");

module.exports = {
	addParent: async (req, res) => {
		try {
			const parentData = await ParentModel.create(req.body);
			return res
				.status(201)
				.json({ message: "Parent Added Successfully", parentDetails: parentData });
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "Server Error" });
		}
	},
	updateParent: async (req, res) => {
		try {
			const parentId = req.params.Id;
			const { name, email, ocupation, phoneNumber, designation } = req.body;
			const parentData = await ParentModel.findByIdAndUpdate(
				{ _id: mongoose.Types.ObjectId(parentId) },
				{ name, email, ocupation, phoneNumber, designation },
				{ new: true }
			);
			return res
				.status(200)
				.json({ message: "Parent Updated Successfully", updatedParentDetails: parentData });
		} catch (err) {
			res.status(500).json({ message: "Server Error" });
		}
	},
	parentDetails: async (req, res) => {
		try {
			const parentId = req.params.Id;
			const parentData = await ParentModel.findOne({ _id: mongoose.Types.ObjectId(parentId) });
			return res
				.status(200)
				.json({ message: "Parent Data Fetched successfully", parentDetails: parentData });
		} catch (err) {
			res.status(500).json({ message: "Server Error" });
		}
	},
	parentDelete: async (req, res) => {
		try {
			const parentId = req.params.Id;
			const parentData = await ParentModel.findOneAndDelete({
				_id: mongoose.Types.ObjectId(parentId),
			});
			return res
				.status(200)
				.json({ message: "Parent Deleted successfully", parentDetails: parentData });
		} catch (err) {
			res.status(500).json({ message: "Server Error" });
		}
	},
	allParentList: async (req, res) => {
		try {
			const parentList = await ParentModel.find();
			return res.status(200).json({ message: "All parents List", parentList });
		} catch (error) {
			res.status(500).json({ message: "Server Error" });
		}
	},
};
