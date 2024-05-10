import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact, FaNodeJs  } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { DiMongodb } from "react-icons/di";
import { TiDatabase } from "react-icons/ti";

const Category = () => {
  const [categories, setCategories] = useState([
{
      id: 1,
      title: "Graphics & Design",
      categoryJobCount: 0,
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      categoryJobCount: 0,
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      categoryJobCount: 0,
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "MERN Stack Development",
      categoryJobCount: 0,
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Account & Finance",
      categoryJobCount: 0,
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      categoryJobCount: 0,
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Video Animation",
      categoryJobCount: 0,
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "MEAN Stack Development",
      categoryJobCount: 0,
      icon: <DiMongodb />,
    },
    {
      id: 9,
      title: "MEVN Stack Development",
      categoryJobCount: 0,
      icon: <FaNodeJs  />,
    },
    {
      id: 10,
      title: "Data Entry Operator",
      categoryJobCount: 0,
      icon: <TiDatabase />,
    },
  ]);

  const getAllJobs = async () => {
    try {
      const response = await axios.get("https://job-portal-api.up.railway.app/api/v1/job/getall", {
        withCredentials: true,
      });
      const jobs = response.data.jobs;
      const updatedCategories = categories.map((category) => {
        const jobsInCategory = jobs.filter((job) => job.category === category.title);
        return {
          ...category,
          categoryJobCount: jobsInCategory.length,
        };
      });
      setCategories(updatedCategories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <div id="category" className="res-category-container w-full flex flex-col justify-center items-center px-[90px] bg-primary-color py-[100px]">
      <h3 className="text-[25px] md:text-[28px] text-center font-[700] leading-[1.3em]">One Platform<br /><span className="text-third-text-color">Many Solutions</span></h3>
      <div className="w-full flex flex-wrap justify-center gap-6 mt-[70px]">
        {categories.map((element) => {
          return (
            <div className="flex bg-secondary-color p-[30px] rounded-[15px] gap-4" key={element.id}>
              <div className="text-[28px] text-third-text-color">{element.icon}</div>
              <div className="">
                <p className="text-[16px] font-[600] text-second-text-color">{element.title}</p>
                <p className="text-[14px] text-second-text-color">{element.categoryJobCount} Jobs Available</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
