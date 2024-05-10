import React, { useContext, useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../main";
import toast from "react-hot-toast";

const FeaturedJob = () => {
  const [allFeaturedJobs, setAllFeaturedJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const [visibleJobsCount, setVisibleJobsCount] = useState(9);
  const [showLoadMore, setShowLoadMore] = useState(true);

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

  useEffect(() => {
    try {
      axios
        .get("https://job-portal-api.up.railway.app/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          const fetchedJobs = res.data.jobs;
          const sortedJobs = fetchedJobs.sort((a, b) => new Date(b.jobPostedOn) - new Date(a.jobPostedOn));
          setAllFeaturedJobs(sortedJobs);
          setJobs(sortedJobs);
        });
    } catch (error) {
      toast(error);
    }
    }, []);

    const handleLoadMoreClick = () => {
          loadMoreJobs();
    };

    const loadMoreJobs = () => {
        setVisibleJobsCount(prevCount => prevCount + 9);
    };

    useEffect(() => {
        const visibleJobs = allFeaturedJobs.slice(0, visibleJobsCount);
        setJobs(visibleJobs);
        setShowLoadMore(visibleJobsCount < allFeaturedJobs.length);
    }, [allFeaturedJobs, visibleJobsCount]);

  return (
    <div id="featured" className="res-featured-container w-full bg-primary-color flex flex-col justify-center items-center px-[90px] py-[100px]">
      <h1 className="text-[25px] md:text-[28px] text-center font-[700] leading-[1.3em]">
      Featured Job<br /><span className="text-third-text-color">Circulars</span>
      </h1>
      <div className="w-full flex flex-wrap gap-6 justify-center mt-[70px]">
        {jobs.map((element) => {
            return (
              <div
                className="res-card-size w-[30%] border-[1px] border-[#efefef] p-[30px] rounded-[15px] flex flex-col gap-2 cursor-pointer hover"
                key={element._id}
              >
                <div className="flex gap-4">
                  <div className="w-[50px] justify-center items-center">
                    <img src="/JobZee-logos__transparent.png" alt="" />
                  </div>
                  <div className="text-second-text-color">
                    <p className="text-[18px] font-[700] leading-[1.3em]">
                      {element.title}
                    </p>
                    <p className="text-[14px] font-[700]">
                      {element.category}
                    </p>
                  </div>
                </div>
                <p className="flex gap-1 items-center text-[16px] font-[500] text-third-text-color">
                  <FaLocationDot className="text-[18px] text-second-text-color" />
                  <span>{element.country},</span>
                  <span>{element.city}</span>
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-[14px] font-[600] text-second-text-color">Posted {calculateTimeDifference(element.jobPostedOn)}</p>
                  <p className="text-[13px] font-[500] bg-[#5BBC2E] px-[10px] py-[2px] rounded-[5px] text-primary-color ">{element.jobType}</p>
                </div>
                {isAuthorized ? (
                  <Link
                    className="border-[1px] border-third-text-color px-[10px] py-[10px] rounded-full flex justify-center items-center text-second-text-color uppercase text-[13px] font-[600] hover-btn"
                    to={`/job/${element._id}`}
                  >
                    Job Details
                  </Link>
                ) : (
                  <Link
                    className="border-[1px] border-third-text-color px-[10px] py-[10px] rounded-full flex justify-center items-center text-second-text-color uppercase text-[13px] font-[600] hover-btn"
                    to={`/login`}
                  >
                    Job Details
                  </Link>
                )}
              </div>
            );
          })}
      </div>
        {showLoadMore && jobs.length > 0 && (
          <div className="flex justify-center mt-4">
              <button className="hover-btn text-[14px] uppercase px-[20px] py-[10px] border-[2px] border-third-text-color rounded-full text-second-text-color font-[600]" onClick={handleLoadMoreClick}>
                  Load More
              </button>
          </div>
        )}
    </div>
  );
};

export default FeaturedJob;
