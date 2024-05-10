import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [applicationEmail, setApplicationEmail] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobTags, setJobTags] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");
  const [fbUserName, setFbUserName] = useState("");
  const [linkedInUserName, setLinkedInUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryFrom("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
  
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/job/post",
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              applicationEmail,
              jobPosition,
              jobType,
              jobTags,
              fixedSalary,
              fbUserName,
              linkedInUserName,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              applicationEmail,
              jobPosition,
              jobType,
              jobTags,
              salaryFrom,
              salaryTo,
              fbUserName,
              linkedInUserName,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const navigateTo = useNavigate();

  if (user && user.role === "Employer") {

  return (
    <>
    <Navbar />
    <div className="res-jobs-container res-t-b w-full h-full sub-image-container flex flex-col justify-center items-center px-[90px] py-[150px] bg-secondary-color">
      <h1 className="w-full text-[25px] md:text-[28px] text-center font-[700] leading-[1.3em] text-second-text-color">Post Job</h1>
    </div>
    <section className="res-jobpost-container w-full h-full px-[90px] pt-[180px] pb-[100px]">
      <div className="w-full h-full">
      {loading ? (
          <div className="w-full flex justify-center items-center mt-[250px]">
          <div className="loading-spinner"></div>
          </div>
          ) : (
          <form onSubmit={handleJobPost} className="w-full flex flex-col gap-8">
              <label htmlFor="jobTitle" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
              <span className="text-[#FF0000] font-[600] text-[17px]">*
                <span className="text-second-text-color ml-[5px]">
                  Job Title
                </span>
              </span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Job Title"
                id="jobTitle"
                className="focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c]"
              />
              </label>

              <label htmlFor="category" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
              <span className="text-[#FF0000] font-[600] text-[17px]">*
                <span className="text-second-text-color ml-[5px]">
                Jobs Category
                </span>
              </span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] font-[500] text-[#5c5c5c]"
                id="category"
              >
                <option value="">Select Category</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Frontend Web Development">
                  Frontend Web Development
                </option>
                <option value="MERN Stack Development">
                  MERN STACK Development
                </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Video Animation">Video Animation</option>
                <option value="MEAN Stack Development">
                  MEAN STACK Development
                </option>
                <option value="MEVN Stack Development">
                  MEVN STACK Development
                </option>
                <option value="Data Entry Operator">Data Entry Operator</option>
              </select>
              </label>
              
              <label htmlFor="country" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
              <span className="text-[#FF0000] font-[600] text-[17px]">*
                <span className="text-second-text-color ml-[5px]">
                Country
                </span>
              </span>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                id="country"
                className="focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c]"
              />
              </label>

              <label htmlFor="city" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
              <span className="text-[#FF0000] font-[600] text-[17px]">*
                <span className="text-second-text-color ml-[5px]">
                City
                </span>
              </span>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                id="city"
                className="focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c]"
              />
              </label>

              <label htmlFor="loctation" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
              <span className="text-[#FF0000] font-[600] text-[17px]">*
                <span className="text-second-text-color ml-[5px]">
                Location
                </span>
              </span>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                id="loctation"
                className="focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c]"
              />
              </label>
              
              <label htmlFor="applicationEmail" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
              <span className="text-[#FF0000] font-[600] text-[17px]">*
                <span className="text-second-text-color ml-[5px]">
                Application Email
                </span>
              </span>
              <input 
                type="text"
                value={applicationEmail}
                onChange={(e) => setApplicationEmail(e.target.value)}
                placeholder="jobify@gmail.com"
                id="applicationEmail"
                className="focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c]"
              />
              </label>

              <label htmlFor="jobPosition" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
              <span className="text-[#FF0000] font-[600] text-[17px]">*
                <span className="text-second-text-color ml-[5px]">
                Job Position
                </span>
              </span>
              <select 
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
                id="jobPosition"
                className="focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] font-[500] text-[#5c5c5c]"
              >
                <option value="Remote">Remote</option>
                <option value="Onsite">Onsite</option>
              </select>
              </label>

              <label htmlFor="jobType" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
              <span className="text-[#FF0000] font-[600] text-[17px]">*
                <span className="text-second-text-color ml-[5px]">
                Job Type
                </span>
              </span>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                id="jobType"
                className="focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] font-[500] text-[#5c5c5c]"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
                <option value="Temporary">Temporary</option>
              </select>
              </label>
              
              <label htmlFor="jobTags" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
              <span className="text-[#FF0000] font-[600] text-[17px]">*
                <span className="text-second-text-color ml-[5px]">
                Job Tags
                </span>
              </span>
              <input 
                type="text"
                value={jobTags}
                onChange={(e) => setJobTags(e.target.value)} 
                placeholder="e.g. PHP, Social Media, Management"
                id="jobTags"
                className="focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c]"
              />
              </label>

              <div>
              <label htmlFor="salaryType" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
              <span className="text-[#FF0000] font-[600] text-[17px]">*
                <span className="text-second-text-color ml-[5px]">
                Salary
                </span>
              </span>
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
                id="salaryType"
                className="focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] font-[500] text-[#5c5c5c]"
              >
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
              </label>

                {salaryType === "default" ? (
                  <p className="text-[14px] font-[600] text-second-text-color mt-[10px]">Please provide Salary Type <span className="text-[16px] text-[#FF0000]">*</span></p>
                ) : salaryType === "Fixed Salary" ? (
                  <label htmlFor="fixedSalary" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase mt-[32px]">
                    <span className="text-[#FF0000] font-[600] text-[17px]">*
                      <span className="text-second-text-color ml-[5px]">
                    Fixed Salary
                      </span>
                    </span>
                  <input
                    type="number"
                    placeholder="Enter Fixed Salary"
                    value={fixedSalary}
                    onChange={(e) => setFixedSalary(e.target.value)}
                    id="fixedSalary"
                    className="focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c]"
                  />
                  </label>
                ) : (
                  <div className="flex flex-col gap-8">
                    <label htmlFor="salaryFrom" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase mt-[32px]">
                    <span className="text-[#FF0000] font-[600] text-[17px]">*
                      <span className="text-second-text-color ml-[5px]">
                      Salary From
                      </span>
                    </span>
                    <input
                      type="number"
                      placeholder="Salary From"
                      value={salaryFrom}
                      onChange={(e) => setSalaryFrom(e.target.value)}
                      id="salaryFrom"
                      className="focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c]"
                    />
                    </label>

                    <label htmlFor="salaryTo" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
                    <span className="text-[#FF0000] font-[600] text-[17px]">*
                      <span className="text-second-text-color ml-[5px]">
                      Salary To
                      </span>
                    </span>
                    <input
                      type="number"
                      placeholder="Salary To"
                      value={salaryTo}
                      onChange={(e) => setSalaryTo(e.target.value)}
                      id="salaryTo"
                      className="focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c]"
                    />
                    </label>
                  </div>
                )}
                </div>

            <label htmlFor="jobDescription" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
            <span className="text-[#FF0000] font-[600] text-[17px]">*
              <span className="text-second-text-color ml-[5px]">
              Job Description
              </span>
            </span>
            <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Job Description"
              id="jobDescription"
              className="focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c]"
            />
            </label>
            
            <label htmlFor="fbUserName" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
            <span className="text-[#FF0000] font-[600] text-[17px]">*
              <span className="text-second-text-color ml-[5px]">
              Facebook Username
              </span>
            </span>
            <input
              type="text"
              value={fbUserName}
              onChange={(e) => setFbUserName(e.target.value)}
              placeholder="your company"
              id="fbUserName"
              className="focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c]"
            />
            </label>

            <label htmlFor="linkedInUserName" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
            <span className="text-[#FF0000] font-[600] text-[17px]">*
              <span className="text-second-text-color ml-[5px]">
              Linkedin Username
              </span>
            </span>
            <input
              type="text"
              value={linkedInUserName}
              onChange={(e) => setLinkedInUserName(e.target.value)}
              placeholder="your company"
              id="linkedInUserName"
              className="focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c]"
            />
            </label>

            <button className="border-[1px] border-third-text-color px-[10px] py-[10px] rounded-full flex justify-center items-center text-second-text-color uppercase text-[13px] font-[600] hover-btn" type="submit">Create Job</button>

          </form>
          )}
      </div>
      </section>
      <Footer />
    </>
  );
} else {
  navigateTo("/");
}
};

export default PostJob;
