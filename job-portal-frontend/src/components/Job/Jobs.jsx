import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../main";
import Navbar from "../Layout/Navbar";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch, FaCaretDown, FaCaretUp  } from "react-icons/fa";
import Footer from "../Layout/Footer";
import toast from "react-hot-toast";

const Jobs = () => {
    const [allJobs, setAllJobs] = useState([]);
    const [jobs, setJobs] = useState([]);
    const { isAuthorized, user } = useContext(Context);
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpenDatePosted, setIsOpenDatePosted] = useState(false);
    const [isOpenCategory, setIsOpenCategory] = useState(false);
    const [isOpenJobType, setIsOpenJobType] = useState(false);
    const [isOpenJobPosition, setIsOpenJobPosition] = useState(false);
    const [selectedDatePosted, setSelectedDatePosted] = useState('');
    const [selectedCategories, setSelectedCategories] = useState('');
    const [selectedJobType, setSelectedJobType] = useState('');
    const [selectedJobPosition, setSelectedJobPosition] = useState('');
    const [visibleJobsCount, setVisibleJobsCount] = useState(9);
    const [showLoadMore, setShowLoadMore] = useState(true);
    const handleReset = () => {
        window.location.reload();
    };
  
    const toggleDropdownDatePosted = () => {
      setIsOpenDatePosted((prevState) => !prevState);
      setIsOpenCategory(false);
      setIsOpenJobType(false);
      setIsOpenJobPosition(false);
    };
  
    const toggleDropdownCategory = () => {
      setIsOpenCategory((prevState) => !prevState);
      setIsOpenDatePosted(false);
      setIsOpenJobType(false);
      setIsOpenJobPosition(false);
    };

    const toggleDropdownJobType = () => {
      setIsOpenJobType((prevState) => !prevState);
      setIsOpenCategory(false);
      setIsOpenDatePosted(false);
      setIsOpenJobPosition(false);
    };

    const toggleDropdownJobPosition = () => {
        setIsOpenJobPosition((prevState) => !prevState);
        setIsOpenCategory(false);
        setIsOpenDatePosted(false);
        setIsOpenJobType(false);
    };
      
    const toggleCategory = (category) => {
        const updatedCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((cat) => cat !== category)
        : [...selectedCategories, category];
        setSelectedCategories(updatedCategories);
    };

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
    
    const handleSearch = () => {
        if (searchInput.length >= 3) {
          setLoading(true);
            const filteredJobs = allJobs.filter(job =>
                job.title.toLowerCase().includes(searchInput.toLowerCase()) ||
                job.category.toLowerCase().includes(searchInput.toLowerCase())
            );
            setJobs(filteredJobs);
            setShowLoadMore(false);
            setTimeout(() => {
              setLoading(false);
            }, 500);
        } else {
            setJobs(allJobs);
        }
    };

    useEffect(() => {
        try {
        setLoading(true);
          axios
            .get("https://job-portal-api.up.railway.app/api/v1/job/getall", {
              withCredentials: true,
            })
            .then((res) => {
              const fetchedJobs = res.data.jobs
              const sortedJobs = fetchedJobs.sort((a, b) => new Date(b.jobPostedOn) - new Date(a.jobPostedOn));
              setAllJobs(sortedJobs);
              setJobs(sortedJobs);
            });
        } catch (error) {
          toast(error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
      }, []);

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const applyFilters = () => {
        setLoading(true);
        setShowLoadMore(false)

        let filteredJobs = allJobs;
    
        // Apply Date Posted filter
        if (selectedDatePosted === 'anytime') {
            // Apply logic for "Anytime" filter option
            setIsOpenDatePosted(false);
        } else if (selectedDatePosted === '1-month') {
            // Apply logic for "1 month" filter option
            setIsOpenDatePosted(false);
            const lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            filteredJobs = filteredJobs.filter(job => new Date(job.jobPostedOn) > lastMonth);
        } else if (selectedDatePosted === 'last-7-days') {
            // Apply logic for "Last 7 days" filter option
            setIsOpenDatePosted(false);
            const lastWeek = new Date();
            lastWeek.setDate(lastWeek.getDate() - 7);
            filteredJobs = filteredJobs.filter(job => new Date(job.jobPostedOn) > lastWeek);
        } else if (selectedDatePosted === 'past-24-hours') {
            // Apply logic for "Past 24 hours" filter option
            setIsOpenDatePosted(false);
            const lastDay = new Date();
            lastDay.setDate(lastDay.getDate() - 1);
            filteredJobs = filteredJobs.filter(job => new Date(job.jobPostedOn) > lastDay);
        }

        // Apply Category filter
        if (selectedCategories.length > 0) {
          setIsOpenCategory(false);
          filteredJobs = filteredJobs.filter(job =>
            selectedCategories.includes(job.category)
          );
        }

        // Apply Job Type filter
        if (selectedJobType !== '') {
          setIsOpenJobType(false);
          filteredJobs = filteredJobs.filter(job => job.jobType === selectedJobType);
        }

        // Apply Job Position filter
        if (selectedJobPosition !== '') {
          setIsOpenJobPosition(false);
          filteredJobs = filteredJobs.filter(job => job.jobPosition === selectedJobPosition);
        }
    
        setJobs(filteredJobs);
        setTimeout(() => {
          setLoading(false);
      }, 500);
    };

    const handleApplyFilters = () => {
      applyFilters();
    };

    const handleLoadMoreClick = () => {
        if (!loading) {
            loadMoreJobs();
        }
    };
    
    const loadMoreJobs = () => {
        setVisibleJobsCount(prevCount => prevCount + 9);
    };

    useEffect(() => {
        const visibleJobs = allJobs.slice(0, visibleJobsCount);
        setJobs(visibleJobs);
        setShowLoadMore(visibleJobsCount < allJobs.length);
    }, [allJobs, visibleJobsCount]);

  return (
    <>
    <Navbar />
    <div className="res-jobs-container res-t-b w-full h-full sub-image-container flex flex-col justify-center items-center px-[90px] py-[150px] bg-secondary-color">
    <h1 className="w-full text-[25px] md:text-[28px] text-center font-[700] leading-[1.3em] text-second-text-color">All Available Jobs</h1>
    </div>
    <div className="res-jobs-container w-full bg-primary-color flex flex-col justify-center items-center px-[90px] pt-[150px] pb-[100px]">
      <div className="w-full flex flex-col justify-center items-center my-[30px]">
            <div className="res-search-container w-[70%] flex items-center px-[15px] py-[10px] gap-3 rounded-[5px] border-[1px] border-[#b1b1b1]">
                <div className="font-[600] text-second-text-color cursor-pointer">
                    <h4>Jobs</h4>
                </div>
                <div className="w-full">
                    <input
                        type="search"
                        placeholder="Search job titles"
                        className="w-full px-[12px] py-[3px] outline-none border-x-[2px] border-[#b1b1b1]"
                        value={searchInput}
                        onChange={handleInputChange}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleSearch();
                            }
                          }}
                    />
                </div>
                <div className="text-third-text-color cursor-pointer" onClick={handleSearch}>
                    <FaSearch />
                </div>
            </div>
        </div>

        <div className="w-full flex flex-row justify-center items-center gap-4 res-overflow">
            <div>
                <button className="bg-third-text-color px-[15px] py-[10px] rounded-full text-primary-color text-[14px] font-[500] flex justify-center items-center gap-3" onClick={toggleDropdownDatePosted}>Date Posted{isOpenDatePosted ? <FaCaretUp className="text-[18px]" /> : <FaCaretDown className="text-[18px]" />}</button>
                {isOpenDatePosted && (
                <div className="res-select-container w-[20%] flex flex-col bg-primary-color shadow-2xl rounded-[10px] py-[15px] absolute">
                    <label htmlFor="anytime" className="px-[15px] py-[5px] flex items-center gap-2 text-[15px] font-[500] checkBox">
                        <input 
                            type="checkbox"
                            checked={selectedDatePosted === 'anytime'}
                            onChange={() => setSelectedDatePosted('anytime')}
                            id="anytime"
                        />
                        Anytime
                    </label>
                    <label htmlFor="month" className="px-[15px] py-[5px] flex items-center gap-2 text-[15px] font-[500] checkBox">
                        <input 
                            type="checkbox"
                            checked={selectedDatePosted === '1-month'}
                            onChange={() => setSelectedDatePosted('1-month')}
                            id="month"
                        />
                        1 month
                    </label>
                    <label htmlFor="days" className="px-[15px] py-[5px] flex items-center gap-2 text-[15px] font-[500] checkBox">
                        <input 
                            type="checkbox"
                            checked={selectedDatePosted === 'last-7-days'}
                            onChange={() => setSelectedDatePosted('last-7-days')}
                            id="days"
                        />
                        Last 7 days
                    </label>
                    <label htmlFor="hours" className="px-[15px] py-[5px] flex items-center gap-2 text-[15px] font-[500] checkBox">
                        <input 
                            type="checkbox"
                            checked={selectedDatePosted === 'past-24-hours'}
                            onChange={() => setSelectedDatePosted('past-24-hours')}
                            id="hours"
                        />
                        Past 24 hours
                    </label>
                    <div className="flex px-[15px] py-[3px] justify-end items-center">
                        <button className="text-[11px] font-[600] px-[15px] py-[7px] bg-third-text-color rounded-full text-primary-color" onClick={handleApplyFilters}>Show Results</button>
                    </div>
                </div>
                )}
            </div>
            <div>
                <button className="bg-third-text-color px-[15px] py-[10px] rounded-full text-primary-color text-[14px] font-[500] flex justify-center items-center gap-3" onClick={toggleDropdownCategory}>Category{isOpenCategory ? <FaCaretUp className="text-[18px]" /> : <FaCaretDown className="text-[18px]" />}</button>
                {isOpenCategory  && (
                <div className="res-select-container w-[30%] flex flex-col bg-primary-color shadow-2xl rounded-[10px] py-[15px] absolute">
                    <label htmlFor="Graphics&Design" className="px-[15px] py-[5px] flex items-center gap-2 text-[15px] font-[500] checkBox">
                        <input 
                            type="checkbox"
                            checked={selectedCategories.includes('Graphics & Design')}
                            onChange={() => toggleCategory('Graphics & Design')}
                            id="Graphics&Design"
                        />
                        Graphics & Design
                    </label>
                    <label htmlFor="MobileAppDevelopment" className="px-[15px] py-[5px] flex items-center gap-2 text-[15px] font-[500] checkBox">
                        <input 
                            type="checkbox"
                            checked={selectedCategories.includes('Mobile App Development')}
                            onChange={() => toggleCategory('Mobile App Development')}
                            id="MobileAppDevelopment"
                        />
                        Mobile App Development
                    </label>
                    <label htmlFor="FrontendWebDevelopment" className="px-[15px] py-[5px] flex items-center gap-2 text-[15px] font-[500] checkBox">
                        <input 
                            type="checkbox"
                            checked={selectedCategories.includes('Frontend Web Development')}
                            onChange={() => toggleCategory('Frontend Web Development')}
                            id="FrontendWebDevelopment"
                        />
                        Frontend Web Development
                    </label>
                    <label htmlFor="MERNStackDevelopment" className="px-[15px] py-[5px] flex items-center gap-2 text-[15px] font-[500] checkBox">
                        <input 
                            type="checkbox"
                            checked={selectedCategories.includes('MERN Stack Development')}
                            onChange={() => toggleCategory('MERN Stack Development')}
                            id="MERNStackDevelopment"
                        />
                        MERN Stack Development
                    </label>
                    <label htmlFor="Account&Finance" className="px-[15px] py-[5px] flex items-center gap-2 text-[15px] font-[500] checkBox">
                        <input 
                            type="checkbox"
                            checked={selectedCategories.includes('Account & Finance')}
                            onChange={() => toggleCategory('Account & Finance')}
                            id="Account&Finance"
                        />
                        Account & Finance
                    </label>
                    <label htmlFor="ArtificialIntelligence" className="px-[15px] py-[5px] flex items-center gap-2 text-[15px] font-[500] checkBox">
                        <input 
                            type="checkbox"
                            checked={selectedCategories.includes('Artificial Intelligence')}
                            onChange={() => toggleCategory('Artificial Intelligence')}
                            id="ArtificialIntelligence"
                        />
                        Artificial Intelligence
                    </label>
                    <label htmlFor="VideoAnimation" className="px-[15px] py-[5px] flex items-center gap-2 text-[15px] font-[500] checkBox">
                        <input 
                            type="checkbox"
                            checked={selectedCategories.includes('Video Animation')}
                            onChange={() => toggleCategory('Video Animation')}
                            id="VideoAnimation"
                        />
                        Video Animation
                    </label>
                    <label htmlFor="MEANStackDevelopment" className="px-[15px] py-[5px] flex items-center gap-2 text-[15px] font-[500] checkBox">
                        <input 
                            type="checkbox"
                            checked={selectedCategories.includes('MEAN Stack Development')}
                            onChange={() => toggleCategory('MEAN Stack Development')}
                            id="MEANStackDevelopment"
                        />
                        MEAN Stack Development
                    </label>
                    <label htmlFor="MEVNStackDevelopment" className="px-[15px] py-[5px] flex items-center gap-2 text-[15px] font-[500] checkBox">
                        <input 
                            type="checkbox"
                            checked={selectedCategories.includes('MEVN Stack Development')}
                            onChange={() => toggleCategory('MEVN Stack Development')}
                            id="MEVNStackDevelopment"
                        />
                        MEVN Stack Development
                    </label>
                    <label htmlFor="DataEntryOperator" className="px-[15px] py-[5px] flex items-center gap-2 text-[15px] font-[500] checkBox">
                        <input 
                            type="checkbox"
                            checked={selectedCategories.includes('Data Entry Operator')}
                            onChange={() => toggleCategory('Data Entry Operator')}
                            id="DataEntryOperator"
                        />
                        Data Entry Operator
                    </label>
                    <div className="flex px-[15px] py-[3px] justify-end items-center">
                        <button className="text-[11px] font-[600] px-[15px] py-[7px] bg-third-text-color rounded-full text-primary-color" onClick={handleApplyFilters}>Show Results</button>
                    </div>
                </div>
                )}
            </div>
            <div>
                <button className="bg-third-text-color px-[15px] py-[10px] rounded-full text-primary-color text-[14px] font-[500] flex justify-center items-center gap-3" onClick={toggleDropdownJobType}>Job Type{isOpenJobType ? <FaCaretUp className="text-[18px]" /> : <FaCaretDown className="text-[18px]" />}</button>
                {isOpenJobType && (
                <div className="res-select-container w-[20%] flex flex-col bg-primary-color shadow-2xl rounded-[10px] py-[15px] absolute">
                    <label htmlFor="Full-Time" className="px-[15px] py-[5px] flex items-center gap-2 text-[15px] font-[500] checkBox">
                        <input 
                            type="checkbox"
                            checked={selectedJobType === 'Full-Time'}
                            onChange={() => setSelectedJobType('Full-Time')}
                            id="Full-Time"
                        />
                        Full-Time
                    </label>
                    <label htmlFor="Part-Time" className="px-[15px] py-[5px] flex items-center gap-2 text-[15px] font-[500] checkBox">
                        <input 
                            type="checkbox"
                            checked={selectedJobType === 'Part-Time'}
                            onChange={() => setSelectedJobType('Part-Time')}
                            id="Part-Time"
                        />
                        Part-Time
                    </label>
                    <label htmlFor="Freelance" className="px-[15px] py-[5px] flex items-center gap-2 text-[15px] font-[500] checkBox">
                        <input 
                            type="checkbox"
                            checked={selectedJobType === 'Freelance'}
                            onChange={() => setSelectedJobType('Freelance')}
                            id="Freelance"
                        />
                        Freelance
                    </label>
                    <label htmlFor="Internship" className="px-[15px] py-[5px] flex items-center gap-2 text-[15px] font-[500] checkBox">
                        <input 
                            type="checkbox"
                            checked={selectedJobType === 'Internship'}
                            onChange={() => setSelectedJobType('Internship')}
                            id="Internship"
                        />
                        Internship
                    </label>
                    <label htmlFor="Temporary" className="px-[15px] py-[5px] flex items-center gap-2 text-[15px] font-[500] checkBox">
                        <input 
                            type="checkbox"
                            checked={selectedJobType === 'Temporary'}
                            onChange={() => setSelectedJobType('Temporary')}
                            id="Temporary"
                        />
                        Temporary
                    </label>
                    <div className="flex px-[15px] py-[3px] justify-end items-center">
                        <button className="text-[11px] font-[600] px-[15px] py-[7px] bg-third-text-color rounded-full text-primary-color" onClick={handleApplyFilters}>Show Results</button>
                    </div>
                </div>
                )}
            </div>
            <div>
                <button className="bg-third-text-color px-[15px] py-[10px] rounded-full text-primary-color text-[14px] font-[500] flex justify-center items-center gap-3" onClick={toggleDropdownJobPosition}>Onsite/Remote{isOpenJobPosition ? <FaCaretUp className="text-[18px]" /> : <FaCaretDown className="text-[18px]" />}</button>
                {isOpenJobPosition && (
                <div className="res-select-container w-[20%] flex flex-col bg-primary-color shadow-2xl rounded-[10px] py-[15px] absolute">
                    <label htmlFor="Onsite" className="px-[15px] py-[5px] flex items-center gap-2 text-[15px] font-[500] checkBox">
                        <input 
                            type="checkbox"
                            checked={selectedJobPosition === 'Onsite'}
                            onChange={() => setSelectedJobPosition('Onsite')}
                            id="Onsite"
                        />
                        Onsite
                    </label>
                    <label htmlFor="Remote" className="px-[15px] py-[5px] flex items-center gap-2 text-[15px] font-[500] checkBox">
                        <input 
                            type="checkbox"
                            checked={selectedJobPosition === 'Remote'}
                            onChange={() => setSelectedJobPosition('Remote')}
                            id="Remote"
                        />
                        Remote
                    </label>
                    <div className="flex px-[15px] py-[3px] justify-end items-center">
                        <button className="text-[11px] font-[600] px-[15px] py-[7px] bg-third-text-color rounded-full text-primary-color" onClick={handleApplyFilters}>Show Results</button>
                    </div>
                </div>
                )}
            </div>
            <div>
                <button className="bg-third-text-color px-[15px] py-[10px] rounded-full text-primary-color text-[14px] font-[500] flex justify-center items-center gap-3" onClick={handleReset}>Reset</button>
            </div>
        </div>
        
        {loading ? (
            <div className="w-full flex justify-center items-center mt-[100px]">
              <div className="loading-spinner"></div>
            </div>
        ) : jobs.length === 0 ? (
            <div className="w-full flex justify-center items-center mt-[50px]">
                <p className="text-[20px] font-[600] text-red-500">No results found.</p>
            </div>
        ) : (
        <div className="w-full flex flex-wrap gap-6 justify-center mt-[50px]">
            {jobs.map((element) => (
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
                ))}
            </div>
            )}
            {!loading && showLoadMore && jobs.length > 0 && (
                <div className="flex justify-center mt-4">
                    <button className="hover-btn text-[14px] uppercase px-[20px] py-[10px] border-[2px] border-third-text-color rounded-full text-second-text-color font-[600]" onClick={handleLoadMoreClick}>
                        Load More
                    </button>
                </div>
            )}
        </div>
    <Footer />
    </>
  );    
};
export default Jobs;
