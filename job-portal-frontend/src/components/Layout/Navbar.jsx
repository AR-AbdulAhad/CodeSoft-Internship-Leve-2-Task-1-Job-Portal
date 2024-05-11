import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://job-portal-nodejs-api.vercel.app/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="res-nav-container w-full flex justify-between items-center px-[90px] py-[45px] fixed bg-primary-color z-40">
      <a href="/">
        <img src="/Logo.png" alt="logo" className="md:w-[131px] w-[100px]" />
      </a>
      <div className="res-menu-hidden">
        <button
          onClick={toggleMenu}
          className="focus:outline-none block text-3xl text-white transition-all duration-300 transform hover:scale-110"
        >
          {isMenuOpen ? (
            <span className="text-second-text-color"><IoClose /></span>
          ) : (
            <span className="text-second-text-color"><HiOutlineMenuAlt1 /></span>
          )}
        </button>
      </div>
      <ul
        className={`${
          isMenuOpen ? "block" : "hidden"
        } res-ismenu flex flex-col text-[15px] font-[500] uppercase gap-5 text-first-text-color justify-center items-center absolute top-full left-0 right-0 bg-primary-color py-[20px]`}
      >
        <li>
          <Link to="/">HOME</Link>
        </li>
        {isAuthorized && user && user.role === "Job Seeker" && (
          <>
            <li>
              <Link to="/job/getall">ALL JOBS</Link>
            </li>
            <li>
              <Link to="/applications/me">MY APPLICATIONS</Link>
            </li>
          </>
        )}
        {isAuthorized && user && user.role !== "Job Seeker" && (
          <>
            <li>
              <Link to="/job/getall">ALL JOBS</Link>
            </li>
            <li>
              <Link to="/applications/me">APPLICANT'S APPLICATIONS</Link>
            </li>
            <li>
              <Link to="/job/post">POST NEW JOB</Link>
            </li>
            <li>
              <Link to="/job/me">VIEW YOUR JOBS</Link>
            </li>
          </>
        )}
        {!isAuthorized && (
          <>
            <li>
              <Link to="/job/getall">ALL JOBS</Link>
            </li>
            <li>
              <Link to="/register">REGISTER</Link>
            </li>
            <li>
              <Link className="border-[2px] border-third-text-color text-third-text-color px-[15px] py-[8px] rounded-full hover-btn" to="/login">LOGIN</Link>
            </li>
          </>
        )}
        {isAuthorized && (
          <li>
            <button
              className="border-[2px] border-third-text-color text-third-text-color px-[15px] py-[8px] rounded-full hover-btn"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
