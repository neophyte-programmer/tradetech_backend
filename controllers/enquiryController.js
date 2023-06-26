const Enquiry = require("../models/enquiryModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
      res.status(200).json({
          message: "Enquiry created successfully",
          data: newEnquiry
      });
  } catch (error) {
    throw new Error(error);
  }
});
const updateEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
        message: "Enquiry updated successfully",
        data: updatedEnquiry
    });
  } catch (error) {
    throw new Error(error);
  }
});
const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
      res.status(200).json({
          message: "Enquiry deleted successfully",
          data: deletedEnquiry
      });
  } catch (error) {
    throw new Error(error);
  }
});
const getSingleEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getAnEnquiry = await Enquiry.findById(id);
      
      res.status(200).json({
        message: "Enquiry fetched successfully",
        data: getAnEnquiry
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getAllEnquiry = asyncHandler(async (req, res) => {
  try {
    const allEnquiry = await Enquiry.find();
    res.status(200).json({
        message: "Enquiries fetched successfully",
        data: allEnquiry
    });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getSingleEnquiry,
  getAllEnquiry,
};