import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import { Job } from "../models/jobSchema.js";

export const postJob = catchAsyncErrors(async (req, res, next) => {
    console.log("hello");
  const {
    title,
    jobType,
    location,
    companyName,
    salary,
    jobNiche,
  } = req.body;
  if (
    !title ||
    !jobType ||
    !location ||
    !companyName ||
    !salary ||
    !jobNiche
  ) {
    return next(new ErrorHandler("Please provide full job details.", 400));
  }
  console.log(req.user);
  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    jobType,
    location,
    companyName,
    salary,
    jobNiche,
    postedBy,
  });
  console.log(job);
  res.status(201).json({
    success: true,
    message: "Job posted successfully.",
    data: job,
  });
});

export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const { city, niche, searchKeyword } = req.query;
  const query = {};
  if (city) {
    query.location = city;
  }
  if (niche) {
    query.jobNiche = niche;
  }
  if (searchKeyword) {
    query.$or = [
      { title: { $regex: searchKeyword, $options: "i" } },
      { companyName: { $regex: searchKeyword, $options: "i" } },
      { introduction: { $regex: searchKeyword, $options: "i" } },
    ];
  }
  const jobs = await Job.find(query);
  res.status(200).json({
    success: true,
    data: jobs,
    count: jobs.length,
  });
});

export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    data: myJobs,
  });
});

export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Oops! Job not found.", 404));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job deleted.",
  });
});

export const getASingleJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Job not found.", 404));
  }
  res.status(200).json({
    success: true,
    job,
  });
});