import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import { FaSearch } from "react-icons/fa";
import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState(null);
  const [editingMode, setEditingMode] = useState(null);
  const [showConfirmDone, setShowConfirmDone] = useState(false);
  const [doneJobId, setDoneJobId] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);

  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://job-portal-nodejs-api.vercel.app/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(response.data.myJobs);
        setJobs(response.data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setTimeout(() => {
            setLoading(false);
        }, 500);
      }
    };

    useEffect(() => {
      fetchJobs();
    }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    setDoneJobId(jobId);
    setShowConfirmDone(true);
  };
  
  const confirmUpdate = async () => {
    setShowConfirmDone(false);
    const updatedJob = myJobs.find((job) => job._id === doneJobId);
    try {
      const res = await axios.put(
        `https://job-portal-nodejs-api.vercel.app/api/v1/job/update/${doneJobId}`,
        updatedJob,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteJob = async (jobId) => {
    setDeleteJobId(jobId);
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    setShowConfirmDelete(false);
    try {
      const res = await axios.delete(
        `https://job-portal-nodejs-api.vercel.app/api/v1/job/delete/${deleteJobId}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== deleteJobId));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSearch = () => {
    if (searchInput.length >= 3) {
      setLoading(true);
        const filteredJobs = myJobs.filter(job =>
            job.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            job.category.toLowerCase().includes(searchInput.toLowerCase())
        );
        setJobs(filteredJobs);
        setTimeout(() => {
          setLoading(false);
        }, 500);
    } else {
        setJobs(myJobs);
    }
  };

  const handleInputSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <>
    <Navbar />
    <div className="res-jobs-container res-t-b w-full h-full sub-image-container flex flex-col justify-center items-center px-[90px] py-[150px] bg-secondary-color">
      <h1 className="w-full text-[25px] md:text-[28px] text-center font-[700] leading-[1.3em] text-second-text-color">My Jobs</h1>
    </div>
    <section className="res-myjobs-container w-full h-full px-[90px] pt-[180px] pb-[100px]">
        <div className="w-full h-full">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full flex justify-end items-center">
            <div className="res-search-myjobs w-[35%] flex justify-start items-center px-[15px] py-[10px] gap-3 rounded-full border-[1px] border-[#b1b1b1]">
              <input
                type="search"
                placeholder="Search job titles and categories"
                className="w-full outline-none pr-[12px] border-r-[2px] border-[#b1b1b1]"
                value={searchInput}
                onChange={handleInputSearch}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <div className="text-third-text-color cursor-pointer" onClick={handleSearch}>
                    <FaSearch />
                    
                </div>
            </div>
          </div>
        </div>
        <ConfirmationModal
          isOpen={showConfirmDelete}
          message="Are you sure you want to delete this job?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirmDelete(false)}
        />
        <ConfirmationModal
          isOpen={showConfirmDone}
          message="Are you sure you want to update this job?"
          onConfirm={confirmUpdate}
          onCancel={() => setShowConfirmDone(false)}
        />
        {loading ? (
              <div className="w-full flex justify-center items-center mt-[100px]">
                <div className="loading-spinner"></div>
              </div>
          ) : jobs.length === 0 ? (
              <div className="w-full flex justify-center items-center mt-[50px] pb-[300px]">
                  <p className="text-[20px] font-[600] text-red-500">No results found.</p>
              </div>
          ) : (
        <>
          {jobs.length > 0 ? (
            <>
              <div className="w-full mt-[50px]">
                {jobs.map((element) => (
                  <div className="w-full" key={element._id}>
                    <h1 className="font-[600] text-[16px] bg-[#f37373c2] text-primary-color p-[10px] rounded-[5px] flex flex-col justify-center mb-[32px] uppercase border-[1px] border-[#f37373c2]">{element.title}</h1>
                    <div className="w-full bg-primary-color border-[1px] border-[#efefef] p-[15px] rounded-[10px] flex flex-col gap-8 mb-[35px] cursor-pointer hover">
                    <div className="flex flex-col md:flex-row w-full gap-4">
                    <label htmlFor="jobTitle" className="w-full flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
                    <span className="text-[#FF0000] font-[600] text-[17px]">*
                      <span className="text-second-text-color ml-[5px]">
                        Job Title
                      </span>
                    </span>
                          <input
                            type="text"
                            id="title"
                            className="focus outline-none border-[1px] border-[#b1b1b1] font-[500] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c] mt-[3px]"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.title}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        </label>
                        <label htmlFor="category" className="w-full flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
                        <span className="text-[#FF0000] font-[600] text-[17px]">*
                          <span className="text-second-text-color ml-[5px]">
                          Jobs Category
                          </span>
                        </span>
                          <select
                            value={element.category}
                            id="category"
                            className="focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[9px] rounded-[3px] font-[500] text-[#5c5c5c] mt-[3px]"
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "category",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value="Graphics & Design">
                              Graphics & Design
                            </option>
                            <option value="Mobile App Development">
                              Mobile App Development
                            </option>
                            <option value="Frontend Web Development">
                              Frontend Web Development
                            </option>
                            <option value="MERN Stack Development">
                              MERN STACK Development
                            </option>
                            <option value="Account & Finance">
                              Account & Finance
                            </option>
                            <option value="Artificial Intelligence">
                              Artificial Intelligence
                            </option>
                            <option value="Video Animation">
                              Video Animation
                            </option>
                            <option value="MEAN Stack Development">
                              MEAN STACK Development
                            </option>
                            <option value="MEVN Stack Development">
                              MEVN STACK Development
                            </option>
                            <option value="Data Entry Operator">
                              Data Entry Operator
                            </option>
                          </select>
                        </label>
                      </div>

                      <div className="flex w-full flex-col md:flex-row gap-4">
                      <label htmlFor="country" className=" w-full flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
                      <span className="text-[#FF0000] font-[600] text-[17px]">*
                        <span className="text-second-text-color ml-[5px]">
                        Country
                        </span>
                      </span>
                          <input
                            type="text"
                            id="country"
                            className="w-full focus outline-none border-[1px] border-[#b1b1b1] font-[500] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c] mt-[3px]"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.country}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "country",
                                e.target.value
                              )
                            }
                          />
                        </label>
                        <label htmlFor="city" className="flex w-full flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
                        <span className="text-[#FF0000] font-[600] text-[17px]">*
                          <span className="text-second-text-color ml-[5px]">
                          City
                          </span>
                        </span>
                          <input
                            type="text"
                            id="city"
                            className="w-full focus outline-none border-[1px] border-[#b1b1b1] font-[500] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c] mt-[3px]"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.city}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "city",
                                e.target.value
                              )
                            }
                          />
                        </label>
                      </div>

                      <div className="flex flex-col md:flex-row w-full gap-4">
                        <label htmlFor="loctation" className="w-full lex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
                        <span className="text-[#FF0000] font-[600] text-[17px]">*
                          <span className="text-second-text-color ml-[5px]">
                          Location
                          </span>
                        </span>
                          <input
                            value={element.location}
                            placeholder="Location"
                            id="location"
                            className="w-full focus outline-none border-[1px] border-[#b1b1b1] font-[500] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c] mt-[3px]"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "location",
                                e.target.value
                              )
                            }
                          />
                        </label>
                        <label htmlFor="applicationEmail" className="w-full flex flex-col text-[17px] font-[600] text-second-text-color uppercase">
                        <span className="text-[#FF0000] font-[600] text-[17px]">*
                          <span className="text-second-text-color ml-[5px]">
                          Application Email
                          </span>
                        </span>
                            <input 
                              type="email"
                              id="applicationEmail"
                              className="w-full focus outline-none border-[1px] border-[#b1b1b1] font-[500] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c] mt-[3px]"
                              value={element.applicationEmail}
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "applicationEmail",
                                  e.target.value
                                )}
                              />
                          </label>
                      </div>
                      
                      <div className="flex flex-col md:flex-row w-full gap-4">
                      <label htmlFor="jobPosition" className="w-full flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
                      <span className="text-[#FF0000] font-[600] text-[17px]">*
                        <span className="text-second-text-color ml-[5px]">
                        Job Position
                        </span>
                      </span>
                          <select
                            value={element.jobPosition}
                            id="jobPosition"
                            className="w-full focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] font-[500] text-[#5c5c5c] mt-[3px]"
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "jobPosition",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value="Remote">Remote</option>
                            <option value="Onsite">Onsite</option>
                          </select>
                        </label>
                        <label htmlFor="jobType" className="w-full flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
                        <span className="text-[#FF0000] font-[600] text-[17px]">*
                          <span className="text-second-text-color ml-[5px]">
                          Job Type
                          </span>
                        </span>
                          <select
                            value={element.jobType}
                            id="jobType"
                            className="w-full focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] font-[500] text-[#5c5c5c] mt-[3px]"
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "jobType",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Internship">Internship</option>
                            <option value="Temporary">Temporary</option>
                          </select>
                        </label>
                      </div>

                      <label htmlFor="jobTags" className="w-full flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
                      <span className="text-[#FF0000] font-[600] text-[17px]">*
                        <span className="text-second-text-color ml-[5px]">
                        Job Tags
                        </span>
                      </span>
                        <input 
                          type="text"
                          value={element.jobTags}
                          id="jobTags"
                          className="w-full focus outline-none border-[1px] border-[#b1b1b1] font-[500] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c] mt-[3px]"
                          disabled={
                            editingMode !== element._id ? true : false
                          }
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "jobTags",
                              e.target.value
                            )}
                          />
                      </label>

                        <div>
                            {element.fixedSalary ? (
                              <label htmlFor="salaryFrom" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
                              <span className="text-[#FF0000] font-[600] text-[17px]">*
                                <span className="text-second-text-color ml-[5px]">
                                Fixed Salary
                                </span>
                              </span>
                              <input
                                type="number"
                                id="fixedSalary"
                                className="focus outline-none border-[1px] font-[500] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c]"
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                value={element.fixedSalary}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "fixedSalary",
                                    e.target.value
                                  )
                                }
                              />
                              </label>
                            ) : (
                        <div className="flex flex-col gap-8">
                          <label htmlFor="salaryFrom" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
                              <span className="text-[#FF0000] font-[600] text-[17px]">*
                                <span className="text-second-text-color ml-[5px]">
                                Salary From
                                </span>
                              </span>
                              <input
                                type="number"
                                id="salaryFrom"
                                className="focus outline-none border-[1px] font-[500] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c]"
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                value={element.salaryFrom}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "salaryFrom",
                                    e.target.value
                                  )
                                }
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
                                  id="salaryTo"
                                  className="focus outline-none border-[1px] font-[500] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c]"
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                  value={element.salaryTo}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "salaryTo",
                                      e.target.value
                                    )
                                  }
                                />
                                </label>
                              </div>
                            )}
                        </div>

                        <label htmlFor="jobDescription" className="w-full flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
                        <span className="text-[#FF0000] font-[600] text-[17px]">*
                          <span className="text-second-text-color ml-[5px]">
                          Job Description
                          </span>
                        </span>
                          <textarea
                            rows={5}
                            value={element.description}
                            placeholder="Job Description"
                            className="w-full focus outline-none border-[1px] border-[#b1b1b1] font-[500] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c] mt-[3px]"
                            id="jobDescription"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </label>

                      <div className="flex flex-col md:flex-row w-full gap-4">
                      <label htmlFor="fbUserName" className="w-full flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
                      <span className="text-[#FF0000] font-[600] text-[17px]">*
                        <span className="text-second-text-color ml-[5px]">
                        Facebook Username
                        </span>
                      </span>
                            <input 
                              type="text"
                              value={element.fbUserName}
                              placeholder="your company"
                              className="w-full focus outline-none border-[1px] border-[#b1b1b1] font-[500] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c] mt-[3px]"
                              id="fbUserName"
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "fbUserName",
                                  e.target.value
                                )}
                              />
                          </label>
                          <label htmlFor="linkedInUserName" className="w-full flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
                          <span className="text-[#FF0000] font-[600] text-[17px]">*
                            <span className="text-second-text-color ml-[5px]">
                            Linkedin Username
                            </span>
                          </span>
                            <input 
                              type="text"
                              value={element.linkedInUserName}
                              placeholder="your company"
                              className="w-full focus outline-none border-[1px] border-[#b1b1b1] font-[500] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c] mt-[3px]"
                              id="linkedInUserName"
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "linkedInUserName",
                                  e.target.value
                                )}
                              />
                          </label>
                      </div>

                      <label htmlFor="expired" className="w-full flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
                        <span className="text-[#FF0000] font-[600] text-[17px]">*
                          <span className="text-second-text-color ml-[5px]">
                          Expired
                          </span>
                        </span>
                          <select
                            value={element.expired}
                            id="expired"
                            className="w-full focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] font-[500] text-[#5c5c5c] mt-[3px]"
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "expired",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value={true}>TRUE</option>
                            <option value={false}>FALSE</option>
                          </select>
                      </label>

                      <div className="flex flex-col md:flex-row gap-4">
                        {editingMode === element._id ? (
                          <>
                            <button
                              onClick={() => handleUpdateJob(element._id)}
                              className="border-[2px] border-third-text-color px-[40px] font-[600] text-[14px] py-[10px] rounded-full cursor-pointer hover-btn"
                            >
                              Done
                            </button>
                            <button
                              onClick={() => handleDisableEdit()}
                              className="border-[2px] border-third-text-color px-[40px] font-[600] text-[14px] py-[10px] rounded-full cursor-pointer hover-btn"
                            >
                              Close
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEnableEdit(element._id)}
                            className="border-[2px] border-third-text-color px-[40px] font-[600] text-[14px] py-[10px] rounded-full cursor-pointer hover-btn"
                          >
                            Edit
                          </button>
                        )}
                      
                      <button
                        onClick={() => handleDeleteJob(element._id)}
                        className="border-[2px] border-third-text-color px-[40px] font-[600] text-[14px] py-[10px] rounded-full cursor-pointer hover-btn"
                      >
                        Delete
                      </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-[20px] font-[600] top-[180px] relative">
              You've not posted any job or may be you deleted all of your jobs!
            </p>
          )}
          </>
          )}
      </div>
    </section>
    <Footer />
    </>
  );
};

export default MyJobs;
