import React, { useState, useEffect } from 'react';

const Copyright = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const interval = setInterval(() => {
      setYear(new Date().getFullYear());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div>
      <p className="font-[600] text-center text-[15px]">
        Copyright &copy; {year} All rights reserved | Powered by{' '}
        <a href="https://www.linkedin.com/in/dev-abdul-ahad" target="_blank" rel="noopener noreferrer">
          Abdul Ahad
        </a>
      </p>
    </div>
  );
};

export default Copyright;
