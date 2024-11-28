const inquiryModel = require("../../db/models/inquirySchema");

exports.inquiryPostPage = (req, res) => {
  res.render("inquiry_post");
};

exports.inquiryPost = async (req, res) => {
  const { firstname, lastname, email, telephone, address, message, ageGroup } =
    req.body;
  try {
    const inquiry = new inquiryModel({
      firstname,
      lastname,
      email,
      telephone,
      address,
      message,
      ageGroup,
    });

    await inquiry.save();

    res.redirect("/postInquiry");
  } catch (error) {
    console.log(error);
  }
};

// inquiry page
exports.inquiry = async (req, res) => {
  try {
    const inquiryData = await inquiryModel.find();
    const inquiryDataCount = await inquiryModel.find().count();

    const calculatedDuration = `${(10 / 5) * inquiryDataCount}s`;

    // Prepare the response with data and count
    const responseData = {
      data: inquiryData,
      count: inquiryDataCount,
      calculatedDuration: calculatedDuration,
    };

    res.render("inquiry", { responseData });
  } catch (error) {
    console.log(error);
  }
};

// detail_inquiry page
exports.inquiryDetails = async (req, res) => {
  try {
    const inquiryData = await inquiryModel.find();

    res.render("detail_inquiry", { inquiryData });
  } catch (error) {
    console.log(error);
  }
};

// update inquiry status
exports.updateInquiryStatus = async (req, res) => {
  const inquireID = req.params.id;

  try {
    const status = "Resolved";
    const inquiryStatusToUpdate = await inquiryModel.findOneAndUpdate(
      { _id: inquireID },
      { status },
      { new: true }
    );

    await inquiryStatusToUpdate.save();

    res.redirect("/inquiryDetails");
  } catch (error) {
    console.log(error);
  }
};

exports.deleteInquiry = async (req, res) => {
  const inquireID = req.params.id;

  try {
    await inquiryModel.findOneAndDelete({
      _id: inquireID,
    });

    console.log("inquiry deleted");

    res.redirect("/inquiryDetails");
  } catch (error) {
    console.log(error);
  }
};
