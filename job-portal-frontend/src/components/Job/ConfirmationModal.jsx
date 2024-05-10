import React from "react";

const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="res-confirm-container bg-white rounded-lg mdp-[32px] border-[1px] border-[#b1b1b1] shadow-xl bg-primary-color text-[17px] font-[600]">
        <p className="text-[18px] leading-[28px]">{message}</p>
        <div className="flex justify-end mt-[16px]">
          <button
            className="px-[16px] py-[8px] mr-[8px] font-[600] text-[14px] border-[2px] border-third-text-color text-white rounded-full text-second-text-color hover-btn uppercase"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="px-[16px] py-[8px] mr-[8px] font-[600] text-[14px] border-[2px] border-third-text-color text-white rounded-full text-second-text-color hover-btn uppercase"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
