const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const parentController = require("../controller/parentController");
const studentController = require("../controller/studentController");
const userController = require("../controller/userController");
const middleware = require("../middleWare/isAuth");

//user routes
router.post(
	"/signup",
	[
		check("name", "Please enter the name ").not().isEmpty(),
		check("email", "Please enter email")
			.matches(/.+\@.+\..+/)
			.withMessage("Email must contain @"),
		check("password", "Please enter the password.").isLength({ min: 6 }),
	],
	userController.signup
);
router.post(
	"/login",
	[
		check("email", "Please enter email")
			.matches(/.+\@.+\..+/)
			.withMessage("Email must contain @"),
		check("password", "Please enter the password.").isLength({ min: 6 }),
	],
	userController.login
);

//student routes protected
router.post("/add-student", middleware.isAuth, studentController.addStudent);
router.get("/student/:Id", middleware.isAuth, studentController.studentDetails);
router.put("/update-student/:Id", middleware.isAuth, studentController.studentUpdate);
router.delete("/delete-student/:Id", middleware.isAuth, studentController.studentDelete);
router.get("/student-list", middleware.isAuth, studentController.allstudentList);

//parent routes protected
router.post("/add-parent", middleware.isAuth, parentController.addParent);
router.get("/parent/:Id", middleware.isAuth, parentController.parentDetails);
router.put("/update-parent/:Id", middleware.isAuth, parentController.updateParent);
router.delete("/delete-parent/:Id", middleware.isAuth, parentController.parentDelete);
router.get("/parent-list", middleware.isAuth, parentController.allParentList);

// students and parents
router.post("/student/:Id/parent", middleware.isAuth, studentController.addParent);
router.get("/student/:Id/parent", middleware.isAuth, studentController.allParentsOfStudent);

module.exports = router;
