import express from "express";
import {
    postApplication,
    employerGetAllApplications,
    jobseekerDeleteApplication,
    jobseekerGetAllApplications,
    getApplicationCount
  } from "../controllers/applicationController.js";
  import { isAuthenticated } from "../middlewares/auth.js";
  
  const router = express.Router();
  
  router.post("/post", isAuthenticated, postApplication);
  router.get("/employer/getall", isAuthenticated, employerGetAllApplications);
  router.get("/jobseeker/getall", isAuthenticated, jobseekerGetAllApplications);
  router.delete("/delete/:id", isAuthenticated, jobseekerDeleteApplication);
  router.get("/applicationcount", getApplicationCount);
export default router;
