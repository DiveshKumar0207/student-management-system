const express = require("express");
const router = express.Router();

// require-controllers
const indexController = require("../controllers/index");
const registerUser = require("../controllers/registerUser");
const logIn = require("../controllers/logIn");
const logOut = require("../controllers/logout");
// const refreshToken = require("../../server/controllers/refreshToken");
const noticeController = require("../controllers/notices")
const homeAdmin = require("../controllers/homeAdmin")
const coursecontroller = require("../controllers/course")
const viewUsercontroller = require("../controllers/viewUser")
const attendanceController = require("../controllers/attendance")
const resetPassController = require("../controllers/resetPass")
const feeController = require("../controllers/fee")
const salaryController = require("../controllers/salary")
const inquiryController = require("../controllers/inquiry")
const errorPageController = require("../controllers/errorPage")

const teacherController = require("../controllers/teacherController")
const studentController = require("../controllers/studentController")

// middleware
const verifyJWT = require("../../middleware/verifyJWT");
const role = require("../../middleware/userRole");
const accountName = require("../../middleware/accountName");


const multer = require("multer");
//  Configure Multer for file uploads
const storage = multer.memoryStorage(); //  Store file in memory
const upload = multer({ storage: storage });



// home nd index page
router.get("/", indexController.index);
 //login route
router.post("/", logIn.login);
router.get("/admin/dashboard", verifyJWT, accountName, role("admin"), homeAdmin.home);
router.get("/student/dashboard", verifyJWT, accountName, role("student"), studentController.home_students);
router.get("/teacher/dashboard", verifyJWT, accountName, role("teacher"), teacherController.home_teachers);

// Reset passsword
router.get("/login/verify/email",  resetPassController.verifyEmailPage);
router.post("/login/verify/email/sendOtp",  resetPassController.sendOtp);
router.get("/login/verify/otp/:otpID",  resetPassController.verifyOtpPage);
router.post("/login/verify/otp/:otpID",  resetPassController.verifyOtp);
router.get("/login/reset/password/:otpID",  resetPassController.resetPasswordPage);
router.post("/login/reset/password/:userRole/:userID",  resetPassController.resetPassword);

// admin main pages
router.get("/admin/inquiry", verifyJWT, accountName, role("admin"), inquiryController.inquiry);
router.get("/admin/courses", verifyJWT, accountName, role("admin"), coursecontroller.courses);
router.get("/admin/teachers", verifyJWT, accountName, role("admin"), viewUsercontroller.teachers);
router.get("/admin/students", verifyJWT, accountName, role("admin"), viewUsercontroller.students);
router.get("/admin/attendance", verifyJWT, accountName, role("admin"), attendanceController.attendance);
router.get("/admin/studentFee", verifyJWT, accountName, role("admin"), feeController.viewFee);
router.get("/admin/notice", verifyJWT, accountName, role("admin"), noticeController.noticePage);

// sub pages
router.get("/admin/addStudent", verifyJWT, accountName, role("admin"), viewUsercontroller.addStudentPage);
router.get("/admin/viewStudent", verifyJWT, accountName, role("admin"), viewUsercontroller.viewStudent);
router.post("/admin/editStudent/:id", verifyJWT, role("admin"), viewUsercontroller.editStudent);
router.post("/updateStudent/:id", verifyJWT,  upload.single("profilepic"), role("admin"), viewUsercontroller.updateStudent);
router.post("/deleteStudent/:id", verifyJWT, role("admin"), viewUsercontroller.deleteStudent);

router.get("/admin/addTeacher", verifyJWT, accountName, role("admin"), viewUsercontroller.addTeacherPage);
router.get("/admin/viewTeacher", verifyJWT, accountName, role("admin"), viewUsercontroller.viewTeacher);
router.post("/admin/editTeacher/:id", verifyJWT, role("admin"), viewUsercontroller.editTeacher);
router.post("/updateTeacher/:id", verifyJWT, role("admin"),  upload.single("profilepic"),  viewUsercontroller.updateTeacher);
router.post("/deleteTeacher/:id", verifyJWT, role("admin"), viewUsercontroller.deleteTeacher);


router.get("/admin/courses/addCourse", verifyJWT, accountName, role("admin"), coursecontroller.addcoursePage);
router.post("/createCourse", verifyJWT, role("admin"), coursecontroller.createCourse);
router.post("/admin/courses/editCourse/:id", verifyJWT, role("admin"), coursecontroller.editCourse);
router.post("/updateCourse/:id", verifyJWT, role("admin"), coursecontroller.updateCourse);
router.post("/deleteCourse/:id", verifyJWT, role("admin"), coursecontroller.deleteCourse);

router.get("/admin/salarydetails", verifyJWT, accountName, role("admin"), salaryController.viewTeacherDetails);
router.get("/admin/feedetails/:courseID", verifyJWT, accountName, role("admin"), feeController.viewStudentDetails);


router.get("/postInquiry", inquiryController.inquiryPostPage);
router.post("/postInquiry", inquiryController.inquiryPost);
router.get("/inquiryDetails", verifyJWT, accountName, role("admin"), inquiryController.inquiryDetails);
router.post("/updateInquiryStatus/:id", verifyJWT, role("admin"), inquiryController.updateInquiryStatus);
router.post("/deleteInquiry/:id", verifyJWT, role("admin"), inquiryController.deleteInquiry);


// courseID -> object id of in courseSchema/course collection
router.get("/admin/markAttendance/:courseID", verifyJWT, accountName, role("admin"), attendanceController.markAttendance)
router.post("/admin/postAttendance/:courseID", verifyJWT, role("admin"), attendanceController.postAttendance)
router.get("/admin/viewAttendance/:courseID", verifyJWT, accountName, role("admin"), attendanceController.viewAttendancePage)
router.get("/admin/searchAttendance/:courseID", verifyJWT, accountName, role("admin"), attendanceController.searchAttendance)

// regsitering routes sub-page
router.post("/admin/addStudent",
  verifyJWT, role("admin"),
  upload.single("profilepic"),
  registerUser.register_student
);
router.post("/admin/addTeacher",
  verifyJWT, role("admin"),
  upload.single("profilepic"),
  registerUser.register_teacher
);

// logout routes
router.post("/logout", verifyJWT, logOut.logout);

// //
router.get("/teacher/attendance", verifyJWT, accountName, role("teacher"), teacherController.T_attendance);
router.get("/teacher/markAttendance/:courseID", verifyJWT, accountName, role("teacher"), teacherController.T_markAttendancePage);
router.post("/teacher/postAttendance/:courseID", verifyJWT, accountName, role("teacher"), teacherController.T_postAttendance);
router.get("/teacher/viewAttendance/:courseID", verifyJWT, accountName, role("teacher"), teacherController.T_viewAttendancePage);
router.get("/teacher/searchAttendance/:courseID", verifyJWT, accountName, role("teacher"), teacherController.T_searchAttendance);

router.get("/student/viewAttendance", verifyJWT, accountName, role("student"), studentController.S_viewAttendancePage);
router.get("/student/searchAttendance", verifyJWT, accountName, role("student"), studentController.S_searchAttendance);

//
// router.post("/refresh", verifyJWT, refreshToken.refresh);

// 
router.post("/postNotice", verifyJWT, role("admin"), noticeController.postNotice);

// 

// 
router.get("*", errorPageController.errorPage);


module.exports = router;
