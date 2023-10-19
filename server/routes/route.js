const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/usercontroller");
const multer = require("multer");
const verifyJWT = require("../../middleware/verifyJWT");

//  Configure Multer for file uploads
const storage = multer.memoryStorage(); //  Store file in memory
const upload = multer({ storage: storage });

// home nd index page
router.get("/", usercontroller.index);
router.post("/", usercontroller.login); //login route
router.get("/postInquiry", usercontroller.inquiry_post);
router.get("/admin/dashboard", usercontroller.home);
router.get("/student/dashboard", verifyJWT, usercontroller.home_students);
router.get("/teacher/dashboard", verifyJWT, usercontroller.home_teachers);

// admin main pages
router.get("/admin/inquiry", usercontroller.inquiry);
router.get("/admin/courses", usercontroller.courses);
router.get("/admin/teachers", usercontroller.teachers);
router.get("/admin/students", usercontroller.students);
router.get("/admin/attendance", usercontroller.attendance);
router.get("/admin/fee", usercontroller.fee);
router.get("/admin/notice", usercontroller.notice);

// sub pages
router.get("/admin/addStudent", usercontroller.addStudent);
router.get("/admin/addTeacher", usercontroller.addTeacher);

// regsitering routes sub-page
router.post(
  "/admin/addStudent",
  upload.single("profilepic"),
  usercontroller.register_student
);
router.post(
  "/admin/addTeacher",
  upload.single("profilepic"),
  usercontroller.register_teacher
);

// logout routes
router.get("/logout", usercontroller.logout);

// //
router.get("/teacher/attendance", verifyJWT, usercontroller.T_attendance);
router.get("/student/viewAttendance", verifyJWT, usercontroller.S_attendance);

module.exports = router;
