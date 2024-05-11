import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
const Application = () => {
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [jobType, setJobType] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("jobTitle", jobTitle);
    formData.append("jobPosition", jobPosition);
    formData.append("jobType", jobType);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://job-portal-nodejs-api.vercel.app/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setJobTitle("");
      setJobPosition("");
      setJobType("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume("");
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setTimeout(() => {
          setLoading(false);
      }, 500);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <>
    <Navbar />
    <section>
      <div className="res-jobs-container res-t-b w-full h-full sub-image-container flex flex-col justify-center items-center px-[90px] py-[150px] bg-secondary-color">
        <h1 className="w-full text-[25px] md:text-[28px] text-center font-[700] leading-[1.3em] text-second-text-color">Application Form</h1>
      </div>
      <div className="res-application-container w-full pt-[180px] pb-[100px] px-[90px] flex flex-col gap-8">
        {loading ? (
            <div className="w-full flex justify-center items-center mt-[200px]">
            <div className="loading-spinner"></div>
            </div>
        ) : (
        <form onSubmit={handleApplication} className="flex flex-col  gap-8">
        <label htmlFor="applicantName" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
        <span className="text-[#FF0000] font-[600] text-[17px]">*
          <span className="text-second-text-color ml-[5px]">
            Name
          </span>
        </span>
          <input
            type="text"
            placeholder="Your Name"
            id="applicantName"
            className="focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          </label>
          <label htmlFor="jobTitle" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
          <span className="text-[#FF0000] font-[600] text-[17px]">*
            <span className="text-second-text-color ml-[5px]">
              Job Title
            </span>
          </span>
          <input
            type="text"
            placeholder="Job Title"
            id="jobTitle"
            className="focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c]"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          </label>
          <label htmlFor="jobPosition" className="w-full flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
          Job Position
            <select
              value={jobPosition}
              id="jobPosition"
              className="w-full focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] font-[500] text-[#5c5c5c] mt-[3px]"
              onChange={(e) => setJobPosition(e.target.value)}
            >
              <option value="Remote">Remote</option>
              <option value="Onsite">Onsite</option>
            </select>
          </label>
          <label htmlFor="jobType" className="w-full flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
            Job Type
            <select
              value={jobType}
              id="jobType"
              className="w-full focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] font-[500] text-[#5c5c5c] mt-[3px]"
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
              <option value="Temporary">Temporary</option>
            </select>
          </label>
          <label htmlFor="Email" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
          <span className="text-[#FF0000] font-[600] text-[17px]">*
            <span className="text-second-text-color ml-[5px]">
              Email
            </span>
          </span>
          <input
            type="email"
            placeholder="Your Email"
            id="Email"
            className="focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </label>
          <label htmlFor="mobileNumber" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
          <span className="text-[#FF0000] font-[600] text-[17px]">*
            <span className="text-second-text-color ml-[5px]">
              Mobile Number
            </span>
          </span>
          <input
            type="number"
            placeholder="+003158359722"
            id="mobileNumber"
            className="focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c]"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          </label>
          <label htmlFor="address" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
          <span className="text-[#FF0000] font-[600] text-[17px]">*
            <span className="text-second-text-color ml-[5px]">
              Address
            </span>
          </span>
          <input
            type="text"
            placeholder="Your Address"
            id="address"
            className="focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c]"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          </label>
          <label htmlFor="CoverLetter" className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
          <span className="text-[#FF0000] font-[600] text-[17px]">*
            <span className="text-second-text-color ml-[5px]">
              Cover Letter
            </span>
          </span>
          <textarea
            placeholder="CoverLetter..."
            id="CoverLetter"
            className="focus outline-none border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] placeholder:font-[500] placeholder:text-[17px] bg-primary-color placeholder:text-[#5c5c5c]"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
          </label>
          <div>
          <label className="flex flex-col gap-1 text-[17px] font-[600] text-second-text-color uppercase">
            <span className="text-[#FF0000] font-[600] text-[17px]">*
              <span className="text-second-text-color ml-[5px]">
                Select Resume
              </span>
            </span>
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={handleFileChange}
              style={{ width: "100%" }}
              className="focus outline-none font-[500] border-[1px] border-[#b1b1b1] px-[20px] py-[7px] rounded-[3px] bg-primary-color"
            />
            </label>
          </div>
          <button className="border-[2px] border-third-text-color px-[10px] py-[10px] rounded-full flex justify-center items-center text-second-text-color uppercase text-[13px] font-[600] hover-btn" type="submit">Send Application</button>
        </form>
        )}
      </div>
    </section>
    <Footer />
    </>
  );
};

export default Application;
