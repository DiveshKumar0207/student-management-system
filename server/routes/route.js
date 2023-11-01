const express = require("express");
const router = express.Router();

// require-controllers
const usercontroller = require("../controllers/usercontroller");
const registerUser = require("../controllers/register");
const logIn = require("../controllers/logIn");
const logOut = require("../controllers/logout");
const refreshToken = require("../../server/controllers/refreshToken");
const notices = require("../controllers/notices")
const homeAdmin = require("../controllers/homeAdmin")
const coursecontroller = require("../controllers/course")
const viewUsercontroller = require("../controllers/viewUser")
const attendanceController = require("../controllers/attendance")
const resetPassController = require("../controllers/resetPass")

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
router.get("/admin/dashboard", verifyJWT, role("admin"), homeAdmin.home);
router.get("/student/dashboard", verifyJWT, role("student"), usercontroller.home_students);
router.get("/teacher/dashboard", verifyJWT, role("teacher"), usercontroller.home_teachers);

// Reset passsword
router.get("/login/verify/email",  resetPassController.verifyEmailPage);
router.post("/login/verify/email/sendOtp",  resetPassController.sendOtp);
router.get("/login/verify/otp/:otpID",  resetPassController.verifyOtpPage);
router.post("/login/verify/otp/:otpID",  resetPassController.verifyOtp);
router.get("/login/reset/password/:otpID",  resetPassController.resetPasswordPage);
router.post("/login/reset/password/:userRole/:userID",  resetPassController.resetPassword);

// admin main pages
router.get("/admin/inquiry", verifyJWT, role("admin"), usercontroller.inquiry);
router.get("/admin/courses", verifyJWT, role("admin"), coursecontroller.courses);
router.get("/admin/teachers", verifyJWT, role("admin"), usercontroller.teachers);
router.get("/admin/students", verifyJWT, role("admin"), usercontroller.students);
router.get("/admin/attendance", verifyJWT, role("admin"), attendanceController.attendance);
router.get("/admin/studentFee", verifyJWT, role("admin"), usercontroller.fee);
router.get("/admin/notice", verifyJWT, role("admin"), usercontroller.notice);

// sub pages
router.get("/admin/addStudent", verifyJWT, role("admin"), usercontroller.addStudent);
router.get("/admin/viewStudent", verifyJWT, role("admin"), viewUsercontroller.viewStudent);
router.post("/admin/editStudent/:id", verifyJWT, role("admin"), viewUsercontroller.editStudent);
router.post("/updateStudent/:id", verifyJWT, role("admin"), upload.single("profilepic"), viewUsercontroller.updateStudent);
router.post("/deleteStudent/:id", verifyJWT, role("admin"), viewUsercontroller.deleteStudent);

router.get("/admin/addTeacher", verifyJWT, role("admin"), usercontroller.addTeacher);
router.get("/admin/viewTeacher", verifyJWT, role("admin"), viewUsercontroller.viewTeacher);
router.post("/admin/editTeacher/:id", verifyJWT, role("admin"), viewUsercontroller.editTeacher);
router.post("/updateTeacher/:id", verifyJWT, role("admin"), viewUsercontroller.updateTeacher);
router.post("/deleteTeacher/:id", verifyJWT, role("admin"), viewUsercontroller.deleteTeacher);


router.get("/admin/courses/addCourse", verifyJWT, role("admin"), coursecontroller.addcoursePage);
router.post("/createCourse", verifyJWT, role("admin"), coursecontroller.createCourse);
router.post("/admin/courses/editCourse/:id", verifyJWT, role("admin"), coursecontroller.editCourse);
router.post("/updateCourse/:id", verifyJWT, role("admin"), coursecontroller.updateCourse);
router.post("/deleteCourse/:id", verifyJWT, role("admin"), coursecontroller.deleteCourse);


// courseID -> object id of in courseSchema/course collection
router.get("/admin/markAttendance/:courseID", verifyJWT, role("admin"), attendanceController.markAttendance)
router.post("/admin/postAttendance/:courseID", verifyJWT, role("admin"), attendanceController.postAttendance)
router.get("/admin/viewAttendance/:courseID", verifyJWT, role("admin"), attendanceController.viewAttendancePage)
router.get("/admin/searchAttendance/:courseID", verifyJWT, role("admin"), attendanceController.searchAttendance)

// regsitering routes sub-page
router.post(
  "/admin/addStudent",
  verifyJWT, role("admin"),
  upload.single("profilepic"),
  registerUser.register_student
);
router.post(
  "/admin/addTeacher",
  verifyJWT, role("admin"),
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

// 
router.post("/postNotice", verifyJWT, role("admin"), notices.notice);

module.exports = router;
