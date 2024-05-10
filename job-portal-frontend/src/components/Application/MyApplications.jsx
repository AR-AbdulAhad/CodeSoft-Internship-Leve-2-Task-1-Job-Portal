import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import ConfirmationModal from "../Job/ConfirmationModal";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteApplicationId, setDeleteApplicationId] = useState(null);
  const [loading, setLoading] = useState(false);

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        setLoading(true);
        axios
        .get("http://localhost:4000/api/v1/application/employer/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setApplications(res.data.applications);
        });
      } else {
        setLoading(true);
        axios
          .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setTimeout(() => {
          setLoading(false);
      }, 500);
  }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    setDeleteApplicationId(id)
    setShowConfirmDelete(true); 
  }

  const confirmDelete = async () => {
    setShowConfirmDelete(false); 
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${deleteApplicationId}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== deleteApplicationId)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

    return (
      <>
      <Navbar />
      <section className="w-full h-full pb-[100px]">
      {user && user.role === "Job Seeker" ? (
      <>
      <div className="res-jobs-container res-t-b w-full h-full sub-image-container flex flex-col justify-center items-center px-[90px] py-[150px] bg-secondary-color">
        <h1 className="w-full text-[25px] md:text-[28px] text-center font-[700] leading-[1.3em] text-second-text-color">My Applications</h1>
      </div>
        <div className="res-myapplication-container w-full flex flex-col pt-[180px] px-[90px] justify-center items-center gap-8">
          {applications.length <= 0 ? (
            <div className="w-full flex flex-col justify-center items-center pt-[110px]">
              <h4 className="text-[20px] font-[600] text-red-500">No Applications Found.</h4>
            </div>
          ) : (
            applications.map((element) => {
              return (
                <>
                {loading ? (
                  <div className="w-full flex justify-center items-center mt-[200px]">
                  <div className="loading-spinner"></div>
                  </div>
                ) : (
                <>
                  <div className="w-full flex flex-col p-[15px] rounded-[5px] border-[1px] border-[#efefef] cursor-pointer hover">
                  <ConfirmationModal
                      isOpen={showConfirmDelete}
                      message="Are you sure you want to delete your application?"
                      onConfirm={confirmDelete}
                      onCancel={() => setShowConfirmDelete(false)}
                  />
                  <div className="w-full flex flex-col gap-4">
                    <div className="w-full flex-col md:flex-row flex gap-5 md:gap-8">
                      <p className="w-[100%] md:w-[50%] border-t-[1px] border-b-[1px] border-[#efefef] px-[20px] py-[10px] text-[17px] font-[500] text-second-text-color uppercase">
                          <span className="font-[600] text-second-text-color">Name:</span> {element.name}
                        </p>
                        <p className="w-[100%] md:w-[50%] border-t-[1px] border-b-[1px] border-[#efefef] px-[20px] py-[10px] text-[17px] font-[500] text-second-text-color uppercase">
                          <span className="font-[600] text-second-text-color">Job Title:</span> {element.jobTitle}
                        </p>
                    </div>
                    <div className="w-full flex-col md:flex-row flex gap-5 md:gap-8">
                      <p className="w-[100%] md:w-[50%] border-t-[1px] border-b-[1px] border-[#efefef] px-[20px] py-[10px] text-[17px] font-[500] text-second-text-color uppercase">
                        <span className="font-[600] text-second-text-color">Job Position:</span> {element.jobPosition}
                      </p>
                      <p className="w-[100%] md:w-[50%] border-t-[1px] border-b-[1px] border-[#efefef] px-[20px] py-[10px] text-[17px] font-[500] text-second-text-color uppercase">
                        <span className="font-[600] text-second-text-color">Job Type:</span> {element.jobType}
                      </p>
                    </div>
                    <div className="w-full flex-col md:flex-row flex gap-5 md:gap-8">
                      <p className="w-[100%] md:w-[50%] border-t-[1px] border-b-[1px] border-[#efefef] px-[20px] py-[10px] text-[17px] font-[500] text-second-text-color uppercase">
                        <span className="font-[600] text-second-text-color">Email:</span> {element.email}
                        <span className="text-[14px] font-[600] text-[#5BBC2E]"></span>
                      </p>
                      <p className="w-[100%] md:w-[50%] border-t-[1px] border-b-[1px] border-[#efefef] px-[20px] py-[10px] text-[17px] font-[500] text-second-text-color uppercase">
                        <span className="font-[600] text-second-text-color">Phone:</span> {element.phone}
                        <span className="text-[14px] font-[600] text-[#5BBC2E]"></span>
                      </p>
                    </div>
                    <div className="w-full flex-col md:flex-row flex gap-5 md:gap-8">
                      <p className="w-[100%] md:w-[50%] relative border-[1px] border-[#efefef] px-[20px] py-[10px] text-[17px] font-[500] text-second-text-color uppercase">
                        <span className="font-[600] text-second-text-color">Address:</span>
                         <textarea
                          value={element.address}
                          className="w-full outline-none appearance-none border-none text-[17px] font-[500] text-second-text-color uppercase"
                         ></textarea>
                      </p>
                      <p className="w-[100%] md:w-[50%] relative border-[1px] border-[#efefef] px-[20px] py-[10px] text-[17px] font-[500] text-second-text-color uppercase">
                        <span className="font-[600] text-second-text-color">CoverLetter:</span>
                        <textarea 
                          value={element.coverLetter}
                          className="w-full outline-none appearance-none border-none text-[17px] font-[500] text-second-text-color uppercase"
                        ></textarea>
                      </p>
                    </div>
                        <a href={element.resume.url} target="_blank" className="decoration-none font-[600] text-[14px] text-third-text-color">View Resume File</a>
                      <div className="w-full border-[2px] border-third-text-color px-[40px] font-[600] text-[14px] py-[10px] rounded-full cursor-pointer hover-btn flex justify-center items-center">
                        <button onClick={() => deleteApplication(element._id)}>
                          Delete Application
                        </button>
                      </div>
                    </div>
                  </div>
                </>
                )}
              </>
              );
            })
          )}
        </div>
        </>
      ) : (
      <>
        <div className="res-jobs-container res-t-b w-full h-full sub-image-container flex flex-col justify-center items-center px-[90px] py-[150px] bg-secondary-color">
          <h1 className="w-full text-[25px] md:text-[28px] text-center font-[700] leading-[1.3em] text-second-text-color">Applications From Job Seekers</h1>
        </div>
        <div className="res-myapplication-container w-full flex flex-col pt-[180px] px-[90px] justify-center items-center gap-8">
          {applications.length <= 0 ? (
            <div className="w-full flex flex-col justify-center items-center pt-[110px]">
              <h4 className="text-[20px] font-[600] text-red-500">No Applications Found.</h4>
            </div>
          ) : (
            applications.map((element) => {
              return (
                <>
                {loading ? (
                  <div className="w-full flex justify-center items-center mt-[200px]">
                  <div className="loading-spinner"></div>
                  </div>
                ) : (
                <>
                  <div className="w-full flex flex-col p-[15px] rounded-[5px] border-[1px] border-[#efefef] cursor-pointer hover">
                  <div className="w-full flex flex-col gap-4">
                    <div className="w-full flex-col md:flex-row flex gap-5 md:gap-8">
                      <p className="w-[100%] md:w-[50%] border-t-[1px] border-b-[1px] border-[#efefef] px-[20px] py-[10px] text-[17px] font-[500] text-second-text-color uppercase">
                          <span className="font-[600] text-second-text-color">Name:</span> {element.name}
                        </p>
                        <p className="w-[100%] md:w-[50%] border-t-[1px] border-b-[1px] border-[#efefef] px-[20px] py-[10px] text-[17px] font-[500] text-second-text-color uppercase">
                          <span className="font-[600] text-second-text-color">Job Title:</span> {element.jobTitle}
                        </p>
                    </div>
                    <div className="w-full flex-col md:flex-row flex gap-5 md:gap-8">
                      <p className="w-[100%] md:w-[50%] border-t-[1px] border-b-[1px] border-[#efefef] px-[20px] py-[10px] text-[17px] font-[500] text-second-text-color uppercase">
                        <span className="font-[600] text-second-text-color">Job Position:</span> {element.jobPosition}
                      </p>
                      <p className="w-[100%] md:w-[50%] border-t-[1px] border-b-[1px] border-[#efefef] px-[20px] py-[10px] text-[17px] font-[500] text-second-text-color uppercase">
                        <span className="font-[600] text-second-text-color">Job Type:</span> {element.jobType}
                      </p>
                    </div>
                    <div className="w-full flex-col md:flex-row flex gap-5 md:gap-8">
                      <p className="w-[100%] md:w-[50%] border-t-[1px] border-b-[1px] border-[#efefef] px-[20px] py-[10px] text-[17px] font-[500] text-second-text-color uppercase">
                        <span className="font-[600] text-second-text-color">Email:</span> {element.email}
                        <span className="text-[14px] font-[600] text-[#5BBC2E]"></span>
                      </p>
                      <p className="w-[100%] md:w-[50%] border-t-[1px] border-b-[1px] border-[#efefef] px-[20px] py-[10px] text-[17px] font-[500] text-second-text-color uppercase">
                        <span className="font-[600] text-second-text-color">Phone:</span> {element.phone}
                        <span className="text-[14px] font-[600] text-[#5BBC2E]"></span>
                      </p>
                    </div>
                    <div className="w-full flex-col md:flex-row flex gap-5 md:gap-8">
                      <p className="w-[100%] md:w-[50%] relative border-[1px] border-[#efefef] px-[20px] py-[10px] text-[17px] font-[500] text-second-text-color uppercase">
                        <span className="font-[600] text-second-text-color">Address:</span>
                         <textarea
                          value={element.address}
                          className="w-full outline-none appearance-none border-none text-[17px] font-[500] text-second-text-color uppercase"
                         ></textarea>
                      </p>
                      <p className="w-[100%] md:w-[50%] relative border-[1px] border-[#efefef] px-[20px] py-[10px] text-[17px] font-[500] text-second-text-color uppercase">
                        <span className="font-[600] text-second-text-color">CoverLetter:</span>
                        <textarea 
                          value={element.coverLetter}
                          className="w-full outline-none appearance-none border-none text-[17px] font-[500] text-second-text-color uppercase"
                        ></textarea>
                      </p>
                    </div>
                        <a href={element.resume.url} target="_blank" className="decoration-none font-[600] text-[14px] text-third-text-color">View Resume File</a>
                    </div>
                  </div>
                </>
                )}
              </>
              );
            })
          )}
        </div>
      </>
      ) }
      </section>
      <Footer />
      </>
    );
};

export default MyApplications;
