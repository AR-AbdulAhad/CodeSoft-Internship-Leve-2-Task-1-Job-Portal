import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { GiTiredEye, GiBeastEye } from "react-icons/gi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "z/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <section className="w-full bg-primary-color flex flex-col justify-center items-center pt-[120px] px-[20px]">
        <div className="res-login shad bg-primary-color border-[1px] border-[#efefef] w-[35%] p-[25px] flex flex-col gap-4 rounded-[10px]">
          <div className="w-full">
            <h2 className="text-[28px] font-[600] uppercase">Login</h2>
            <div className="w-[13%] h-[2px] bg-third-text-color"></div>
          </div>
          <form className="flex flex-col gap-4">
          <div className="w-full">
              <label className="text-[14px] font-[600] text-second-text-color">Login As</label>
              <div className="res-role-container w-full flex justify-center items-center gap-4 mt-[5px]">
                <label className={`flex gap-2 border-[1px] text-[14px] font-[500] text-third-text-color px-[40px] py-[5px] rounded-[5px] border-third-text-color cursor-pointer ${role === "Employer" ? 'active' : ''}`}>
                  <input
                    type="radio"
                    value="Employer"
                    className="absolute invisible"
                    checked={role === "Employer"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  Employer
                </label>
                <label className={`flex gap-2 border-[1px] text-[14px] font-[500] text-third-text-color px-[40px] py-[5px] rounded-[5px] border-third-text-color cursor-pointer ${role === "Job Seeker" ? 'active' : ''}`}>
                  <input
                    type="radio"
                    value="Job Seeker"
                    className="absolute invisible"
                    checked={role === "Job Seeker"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  Job Seeker
                </label>
              </div>
            </div>
            <div>
              <label className="text-[14px] font-[600] text-second-text-color">Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="jobify@gmail.com"
                  className="focus w-full outline-none border-[1px] border-[#b1b1b1] px-[15px] py-[6px] rounded-[5px] bg-primary-color placeholder:text-[#5c5c5c] placeholder:font-[500] placeholder:text-[14px] mt-[3px]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-[14px] font-[600] text-second-text-color">Password</label>
              <div className="focus select-none flex justify-center items-center border-[1px] border-[#b1b1b1] rounded-[5px] mt-[3px] px-[15px]">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your Password"
                  className="w-full outline-none pr-[15px] py-[6px] bg-primary-color placeholder:text-[#5c5c5c] placeholder:font-[500] placeholder:text-[14px]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? (
                  <GiTiredEye
                    className="text-[20px] text-third-text-color cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <GiBeastEye
                    className="text-[20px] text-third-text-color cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
            <button
              className="w-full bg-third-text-color rounded-[5px] py-[8px] text-primary-color text-[14px] font-[500] hovers-btn border-[2px] border-third-text-color mt-[5px]"
              type="submit"
              onClick={handleLogin}
            >
              Login
            </button>
            <div className="res-acc-container w-full flex justify-center items-center text-[14px] font-[600] text-second-text-color gap-1">
              <span>Don't have an account yet?</span>
              <span className="text-third-text-color">
                <Link to={"/register"}>Register Now</Link>
              </span>
            </div>
          </form>
        </div>
        <Link
          to={"/"}
          className="absolute top-[60px] left-[20px] border-[2px] border-third-text-color px-[40px] py-[10px] rounded-full text-second-text-color font-[600] text-[14px] hover-btn"
        >
          Back
        </Link>
      </section>
    </>
  );
};

export default Login;
