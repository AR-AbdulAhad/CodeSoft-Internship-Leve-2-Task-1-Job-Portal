import mongoose from "mongoose";
import validator from "validator";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title."],
    minLength: [3, "Title must contain at least 3 Characters!"],
    maxLength: [30, "Title cannot exceed 30 Characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide decription."],
    minLength: [30, "Description must contain at least 30 Characters!"],
    maxLength: [500, "Description cannot exceed 500 Characters!"],
  },
  category: {
    type: String,
    required: [true, "Please provide a category."],
  },
  country: {
    type: String,
    required: [true, "Please provide a country name."],
  },
  city: {
    type: String,
    required: [true, "Please provide a city name."],
  },
  location: {
    type: String,
    required: [true, "Please provide location."],
    minLength: [20, "Location must contian at least 20 characters!"],
  },
  applicationEmail: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  jobPosition: {
    type: String,
    required: [true, "Please select a job position"],
  },
  jobType: {
    type: String,
    required: [true, "Please select a job type"],
  },
  jobTags: {
    type: String,
    required: [true, "Please provide a job tags."],
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits"],
    maxLength: [9, "Salary cannot exceed 9 digits"],
  },
  salaryFrom: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits"],
    maxLength: [9, "Salary cannot exceed 9 digits"],
  },
  salaryTo: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits"],
    maxLength: [9, "Salary cannot exceed 9 digits"],
  },
  fbUserName: {
    type: String,
    required: [true, "Please provide a facebook username"],
  },
  linkedInUserName: {
    type: String,
    required: [true, "Please provide a linkedin username"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
