const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/usercontroller");
const multer = require("multer");

//  Configure Multer for file uploads
const storage = multer.memoryStorage(); //  Store file in memory
const upload = multer({ storage: storage });

// home nd index page
router.get("/", usercontroller.index);
router.get("/postInquiry", usercontroller.inquiry_post);
router.get("/home", usercontroller.home);

//
router.get("/inquiry", usercontroller.inquiry);
router.get("/courses", usercontroller.courses);
router.get("/teachers", usercontroller.teachers);
router.get("/students", usercontroller.students);
router.get("/attendance", usercontroller.attendance);
router.get("/fee", usercontroller.fee);
router.get("/notice", usercontroller.notice);

//
router.get("/addStudent", usercontroller.addStudent);
router.post(
  "/addStudent",
  upload.single("profilepic"),
  usercontroller.register_student
);
router.get("/addTeacher", usercontroller.addTeacher);

//
router.post("/", usercontroller.login);

module.exports = router;
