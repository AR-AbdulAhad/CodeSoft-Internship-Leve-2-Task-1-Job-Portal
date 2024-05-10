import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaWhatsapp, FaGithub, FaLinkedin } from "react-icons/fa";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <footer className="res-footer-container w-full bg-secondary-color px-[90px] py-[30px] flex flex-col justify-center items-center gap-4">
      <div className="flex gap-4">
        <Link to={"https://www.facebook.com/dev.abdulahad"} target="_blank">
          <FaFacebookF className="text-[24px] text-third-text-color" />
        </Link>
        <Link to={"https://github.com/AR-AbdulAhad"} target="_blank">
          <FaGithub className="text-[24px] text-third-text-color" />
        </Link>
        <Link to={"https://www.linkedin.com/in/dev-abdul-ahad"} target="_blank">
          <FaLinkedin className="text-[24px] text-third-text-color" />
        </Link>
        <Link to={"https://wa.me/+923158359722"} target="_blank">
          <FaWhatsapp className="text-[24px] text-third-text-color" />
        </Link>
      </div>
      <Copyright />
    </footer>
  );
};

export default Footer;
