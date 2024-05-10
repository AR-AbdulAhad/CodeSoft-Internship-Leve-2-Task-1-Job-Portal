import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <footer className="res-footer-container w-full bg-secondary-color px-[90px] py-[30px] flex flex-col justify-center items-center gap-4">
      <div className="flex gap-4">
        <Link to={"https://www.facebook.com/profile.php?id=100030535123397"} target="_blank">
          <FaFacebookF className="text-[24px] text-third-text-color" />
        </Link>
        <Link to={"https://www.youtube.com/@CodeWithZeeshu"} target="_blank">
          <FaYoutube className="text-[24px] text-third-text-color" />
        </Link>
        <Link to={"https://www.youtube.com/@CodeWithZeeshu"} target="_blank">
          <FaLinkedin className="text-[24px] text-third-text-color" />
        </Link>
        <Link to={"https://www.instagram.com/z_4_zeeshuuu/"} target="_blank">
          <RiInstagramFill className="text-[24px] text-third-text-color" />
        </Link>
      </div>
      <Copyright />
    </footer>
  );
};

export default Footer;
