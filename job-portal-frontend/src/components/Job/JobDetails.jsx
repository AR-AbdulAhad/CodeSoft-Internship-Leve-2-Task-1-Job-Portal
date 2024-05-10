import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    try {
      setLoading(true)
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
    } catch(error) {
        navigateTo("/notfound");
    } finally {
      setTimeout(() => {
          setLoading(false);
      }, 500);
    }
  }, []);

  const calculateTimeDifference = (postedAt) => {
    const currentTime = new Date();
    const postedTime = new Date(postedAt);
    const timeDifference = (currentTime.getTime() - postedTime.getTime()) / 1000;

    if (timeDifference < 60) {
      return "Just now";
    } else if (timeDifference < 3600) {
      const minutes = Math.floor(timeDifference / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (timeDifference < 86400) {
      const hours = Math.floor(timeDifference / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (timeDifference < 31536000) {
      const days = Math.floor(timeDifference / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else {
      const years = Math.floor(timeDifference / 31536000);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
  };

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <>
    <Navbar />
    <section className="pt-[5px]">
      <div className="res-jobs-container res-t-b w-full h-full sub-image-container flex flex-col justify-center items-center px-[90px] py-[150px] bg-secondary-color">
        <h1 className="w-full text-[25px] md:text-[28px] text-center font-[700] leading-[1.3em] text-second-text-color">Job Details</h1>
      </div>
      <div className="res-jobdetail-container w-full pt-[180px] pb-[100px] px-[90px]">
        {loading ? (
              <div className="w-full flex justify-center items-center mt-[200px]">
              <div className="loading-spinner"></div>
              </div>
          ) : (
          <table className="w-full">
            <tbody className="w-full flex flex-col justify-start items-start">
              <tt className="w-full py-[10px] flex flex-col md:flex-row gap-5 md:gap-8">
                <tt className="w-[100%] md:w-[50%] flex flex-col justify-start items-start">
                  <th className="pb-[10px]">
                    Title:
                  </th>
                  <td className="w-full font-[500] border-[#efefef] border-t-[1px] border-b-[1px] py-[7px]">
                    {job.title}
                  </td>
                </tt>
                <tt className="w-[100%] md:w-[50%] flex flex-col justify-start items-start">
                  <th className="pb-[10px]">
                    Category:
                  </th>
                  <td className="w-full font-[500] border-[#efefef] border-t-[1px] border-b-[1px] py-[7px]">
                    {job.category}
                  </td>
                </tt>
              </tt>
              <tt className="w-full py-[10px] flex flex-col md:flex-row gap-5 md:gap-8">
                <tt className="w-[100%] md:w-[50%] flex flex-col justify-start items-start">
                  <th className="pb-[10px]">
                    Country:
                  </th>
                  <td className="w-full font-[500] border-[#efefef] border-t-[1px] border-b-[1px] py-[7px]">
                    {job.country}
                  </td>
                </tt>
                <tt className="w-[100%] md:w-[50%] flex flex-col justify-start items-start">
                  <th className="pb-[10px]">
                    City:
                  </th>
                  <td className="w-full font-[500] border-[#efefef] border-t-[1px] border-b-[1px] py-[7px]">
                    {job.city}
                  </td>
                </tt>
              </tt>
              <tt className="w-full py-[10px] flex flex-col md:flex-row gap-5 md:gap-8">
                <tt className="w-[100%] md:w-[50%] flex flex-col justify-start items-start">
                  <th className="pb-[10px]">
                    Location:
                  </th>
                  <td className="w-full font-[500] border-[#efefef] border-t-[1px] border-b-[1px] py-[7px]">
                    {job.location}
                  </td>
                </tt>
                <tt className="w-[100%] md:w-[50%] flex flex-col justify-start items-start">
                  <th className="pb-[10px]">
                    Application Email:
                  </th>
                  <td className="w-full font-[500] border-[#efefef] border-t-[1px] border-b-[1px] py-[7px]">
                    {job.applicationEmail}
                  </td>
                </tt>
              </tt>
              <tt className="w-full py-[10px] flex flex-col md:flex-row gap-5 md:gap-8">
                <tt className="w-[100%] md:w-[50%] flex flex-col justify-start items-start">
                  <th className="pb-[10px]">
                    Job Position:
                  </th>
                  <td className="w-full font-[500] border-[#efefef] border-t-[1px] border-b-[1px] py-[7px]">
                    {job.jobPosition}
                  </td>
                </tt>
                <tt className="w-[100%] md:w-[50%] flex flex-col justify-start items-start">
                  <th className="pb-[10px]">
                    Job Type:
                  </th>
                  <td className="w-full font-[500] border-[#efefef] border-t-[1px] border-b-[1px] py-[7px]">
                    {job.jobType}
                  </td>
                </tt>
              </tt>
              <tt className="w-full py-[10px] flex flex-col md:flex-row gap-5 md:gap-8">
                <tt className="w-[100%] md:w-[50%] flex flex-col justify-start items-start">
                  <th className="pb-[10px]">
                    Job Tags:
                  </th>
                  <td className="w-full font-[500] border-[#efefef] border-t-[1px] border-b-[1px] py-[7px]">
                    {job.jobTags}
                  </td>
                </tt>
                <tt className="w-[100%] md:w-[50%] flex flex-col justify-start items-start">
                  <th className="pb-[10px]">
                    Description:
                  </th>
                  <td className="w-full font-[500] border-[#efefef] border-t-[1px] border-b-[1px] py-[7px]">
                    <textarea value={job.description} rows={3} className="w-full border-none outline-none font-[500]"></textarea>
                  </td>
                </tt>
              </tt>
              <tt className="w-full py-[10px] flex flex-col md:flex-row gap-5 md:gap-8">
                <tt className="w-[100%] md:w-[50%] flex flex-col justify-start items-start">
                  <th className="pb-[10px]">
                    Facebook Username:
                  </th>
                  <td className="w-full font-[500] border-[#efefef] border-t-[1px] border-b-[1px] py-[7px]">
                    {job.fbUserName}
                  </td>
                </tt>
                <tt className="w-[100%] md:w-[50%] flex flex-col justify-start items-start">
                  <th className="pb-[10px]">
                    Linkedin Username:
                  </th>
                  <td className="w-full font-[500] border-[#efefef] border-t-[1px] border-b-[1px] py-[7px]">
                    {job.linkedInUserName}
                  </td>
                </tt>
              </tt>
              <tt className="w-full py-[10px] flex flex-col md:flex-row gap-5 md:gap-8">
                <tt className="w-[100%] md:w-[50%] flex flex-col justify-start items-start">
                  <th className="pb-[10px]">Salary:</th>
                  <td className="w-full font-[500] border-[#efefef] border-t-[1px] border-b-[1px] py-[7px]">
                    {job.fixedSalary ? (
                      <td>{job.fixedSalary}</td>
                    ) : (
                      <td >
                        {job.salaryFrom} - {job.salaryTo}
                      </td>
                    )}
                  </td>
                </tt>
                <tt className="w-[100%] md:w-[50%] flex flex-col justify-start items-start">
                  <th className="pb-[10px]">
                    Job Posted On:
                  </th>
                  <td className="w-full font-[500] border-[#efefef] border-t-[1px] border-b-[1px] py-[7px]">
                    {calculateTimeDifference(job.jobPostedOn)}
                  </td>
                </tt>
              </tt>
            </tbody>
            <tfoot>
              {user && user.role === "Employer" ? (
              <></>
              ) : (
                <Link className="w-full mt-[16px] border-[2px] border-third-text-color px-[10px] py-[10px] rounded-full flex justify-center items-center text-second-text-color uppercase text-[13px] font-[600] hover-btn" to={`/application/${job._id}`}>Apply Now</Link>
              )}
            </tfoot>
          </table>
          )}
      </div>
    </section>
    <Footer />
    </>
  );
};

export default JobDetails;
