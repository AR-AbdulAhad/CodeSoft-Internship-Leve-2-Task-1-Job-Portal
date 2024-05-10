import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="res-howitworks-container w-full px-[90px] py-[50px]">
        <div className="w-full flex flex-col justify-center items-center">
          <h3 className="text-[25px] md:text-[28px] text-center font-[700] leading-[1.3em]"><span className="text-third-text-color">How Jobify</span><br />Works</h3>
          <div className="w-full flex flex-wrap justify-center gap-4 mt-[70px]">
            <div className="res-howitworks-card w-[32%] shad border-[1px] border-[#efefef] rounded-[10px] p-[20px] flex flex-col gap-2">
              <FaUserPlus className="text-[30px] text-third-text-color" />
              <p className="font-[700] text-[18px]">Create Account</p>
              <p className="text-[14px]">
                Join our vibrant community. Create your account and unlock boundless opportunities
              </p>
            </div>
            <div className="res-howitworks-card w-[32%] shad bg-third-text-color border-[1px] border-[#efefef] rounded-[10px] p-[20px] flex flex-col gap-2">
              <MdFindInPage className="text-[30px] text-primary-color" />
              <p className="font-[700] text-[18px] text-primary-color">Find a Job/Post a Job</p>
              <p className="text-[14px] text-primary-color">
                Discover your ideal job. Our intuitive search feature makes job hunting effortless.
              </p>
            </div>
            <div className="res-howitworks-card w-[32%] shad border-[1px] border-[#efefef] rounded-[10px] p-[20px] flex flex-col gap-2">
              <IoMdSend className="text-[30px] text-third-text-color" />
              <p className="font-[700] text-[18px]">Apply For Job/Recruit Suitable Candidates</p>
              <p className="text-[14px]">
                Achieve your career goals. Apply for jobs and embark on your next adventure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
