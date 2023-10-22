const express = require("express");
const router = express.Router();

const usercontroller = require("../controllers/usercontroller");
const registerUser = require("../controllers/register");
const logIn = require("../controllers/logIn");
const logOut = require("../controllers/logout");
const refreshToken = require("../../server/controllers/refreshToken");

// middleware
const verifyJWT = require("../../middleware/verifyJWT");
const role = require("../../middleware/userRole");

const multer = require("multer");
//  Configure Multer for file uploads
const storage = multer.memoryStorage(); //  Store file in memory
const upload = multer({ storage: storage });

// home nd index page
router.get("/", usercontroller.index);
router.post("/", logIn.login); //login route
router.get("/postInquiry", usercontroller.inquiry_post);
router.get("/admin/dashboard", verifyJWT, role("admin"), usercontroller.home);
router.get("/student/dashboard", verifyJWT, role("student"), usercontroller.home_students);
router.get("/teacher/dashboard", verifyJWT, role("teacher"), usercontroller.home_teachers);

// admin main pages
router.get("/admin/inquiry", verifyJWT,role("admin"), usercontroller.inquiry);
router.get("/admin/courses", verifyJWT,role("admin"), usercontroller.courses);
router.get("/admin/teachers", verifyJWT,role("admin"), usercontroller.teachers);
router.get("/admin/students", verifyJWT,role("admin"), usercontroller.students);
router.get("/admin/attendance", verifyJWT,role("admin"), usercontroller.attendance);
router.get("/admin/fee", verifyJWT,role("admin"), usercontroller.fee);
router.get("/admin/notice", verifyJWT,role("admin"), usercontroller.notice);

// sub pages
router.get("/admin/addStudent", verifyJWT,role("admin"), usercontroller.addStudent);
router.get("/admin/addTeacher", verifyJWT,role("admin"), usercontroller.addTeacher);

// regsitering routes sub-page
router.post(
  "/admin/addStudent",
  upload.single("profilepic"),
  registerUser.register_student
);
router.post(
  "/admin/addTeacher",
  upload.single("profilepic"),
  registerUser.register_teacher
);

// logout routes
router.post("/logout", verifyJWT, logOut.logout);

// //
router.get("/teacher/attendance", verifyJWT, role("teacher"), usercontroller.T_attendance);
router.get("/student/viewAttendance", verifyJWT, role("student"), usercontroller.S_attendance);

//
router.get("/refresh", verifyJWT, refreshToken.refresh);

module.exports = router;
