import React, { useState, useEffect } from 'react';

const CountSection = () => {
    const [employersCount, setEmployersCount] = useState('00');
    const [jobSeekersCount, setJobSeekersCount] = useState('00');
    const [availableJobsCount, setAvailableJobsCount] = useState('00');
    const [applicationCount, setApplicationCount] = useState('00');

    useEffect(() => {
        fetchCounts();
    }, []);

    const fetchCounts = () => {
        fetch('http://localhost:4000/api/v1/user/getusercounts')
            .then(response => response.json())
            .then(data => {
                animateCount(setEmployersCount, data.employerCount);
                animateCount(setJobSeekersCount, data.jobSeekerCount);
            })
            .catch(error => console.error('Error fetching user counts:', error));

        fetch('http://localhost:4000/api/v1/job/getavailablejobscount')
            .then(response => response.json())
            .then(data => {
                animateCount(setAvailableJobsCount, data.availableJobsCount);
            })
            .catch(error => console.error('Error fetching available jobs count:', error));

        fetch('http://localhost:4000/api/v1/application/applicationcount')
            .then(response => response.json())
            .then(data => {
                animateCount(setApplicationCount, data.applicationCount);
            })
            .catch(error => console.error('Error fetching applications count:', error));
    };

    const animateCount = (setter, targetValue) => {
        const increment = targetValue > 0 ? 1 : 0;
        let currentValue = parseInt(setter(), 10);

        if (isNaN(currentValue)) {
            currentValue = 0;
        }

        const interval = setInterval(() => {
            currentValue += increment;
            setter(currentValue.toString().padStart(2, '0'));
            if ((increment === 1 && currentValue >= targetValue) || (increment === 0 && currentValue <= targetValue)) {
                clearInterval(interval);
            }
        }, 100);
    };

  return (
    <div className="res-countsection-container w-full px-[90px] py-[100px]">
        <div className="w-full flex justify-center items-center">
            <h3 className="text-[25px] md:text-[28px] text-center font-[700] leading-[1.3em]"><span className="text-third-text-color">Job Market</span><br />Overview</h3>
        </div>
        <div className="w-full bg-primary-color flex flex-wrap justify-center gap-16 items-center mt-[100px]">
            <div className="flex justify-center items-center flex-col border-[1px] px-[25px] py-[80px] rounded-full border-[#efefef] shad">
                <div className="mt-[-40px]">
                    <span className="text-[40px] md:text-[50px] font-bold text-third-text-color">{availableJobsCount}</span>
                </div>
                <span className="text-[18px] md:text-[20px] uppercase font-[600] text-second-text-color">Available Jobs</span>
            </div>
            <div className="flex justify-center items-center flex-col border-[1px] px-[35px] py-[80px] rounded-full border-[#efefef] shad">
                <div className="mt-[-40px]">
                    <span className="text-[40px] md:text-[50px] font-bold text-third-text-color">{applicationCount}</span>
                </div>
                <span className="text-[18px] md:text-[20px] uppercase font-[600] text-second-text-color">Applications</span>
            </div>
            <div className="flex justify-center items-center flex-col border-[1px] px-[45px] py-[80px] rounded-full border-[#efefef] shad">
                <div className="mt-[-40px]">
                    <span className="text-[40px] md:text-[50px] font-bold text-third-text-color">{employersCount}</span>
                </div>
                <span className="text-[18px] md:text-[20px] uppercase font-[600] text-second-text-color">Employers</span>
            </div>
            <div className="flex justify-center items-center flex-col border-[1px] px-[45px] py-[80px] rounded-full border-[#efefef] shad">
                <div className="mt-[-40px]">
                    <span className="text-[40px] md:text-[50px] font-bold text-third-text-color">{jobSeekersCount}</span>
                </div>
                <span className="text-[18px] md:text-[20px] uppercase font-[600] text-second-text-color">Job Seekers</span>
            </div>
        </div>
    </div>
  )
}

export default CountSection
