import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [availableJobsCount, setAvailableJobsCount] = useState(0);

  useEffect(() => {
      fetch('https://job-portal-api.up.railway.app/api/v1/job/getavailablejobscount')
      .then(response => response.json())
      .then(data => {
          setAvailableJobsCount(data.availableJobsCount);
      })
      .catch(error => console.error('Error fetching available jobs count:', error));
  }, []);

  return (
    <>
      <div className="res-home-container w-full h-full image-background pt-[80px] pb-[140px] px-[90] flex flex-col justify-center items-center">
        <div>
            <h1 className="text-[45px] md:text-[56px] font-[600] leading-[1.3em] text-second-text-color text-center mb-[15px]">Get The <span className="text-third-text-color">Right Job</span><br />You Deserve</h1>
            <p className="text-center text-[15px] md:text-[18px] font-[400] leading-[1.5em] text-second-text-color">
            {availableJobsCount} jobs listed here! Your dream job is waiting.
            </p>
        </div>
        <div className="mt-[50px]">
            <Link to={"/job/getall"} className="text-[13px] md:text-[14px] font-[500] text-primary-color uppercase bg-third-text-color px-[45px] py-[15px] rounded-full btn-hover-btns border-[2px] border-third-text-color">Find Jobs</Link>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
