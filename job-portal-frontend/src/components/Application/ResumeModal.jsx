import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed w-full h-full flex justify-center items-center top-0 left-0 bg-primary-color z-50">
      <div className="flex flex-col gap-4">
        <span className="text-[48px] w-[40px] h-[40px] bg-[#5BBC2E] flex justify-center items-center text-center rounded-full text-primary-color cursor-pointer" onClick={onClose}>
          &times;
        </span>
        <img className="w-[600px] shadow-2xl" src={imageUrl} alt="resume" />
      </div>
    </div>
  );
};

export default ResumeModal;
