import React from "react";
import SuccessfullyDone from "../../assets/SuccessfullyDone.png";
import "./BankAccountModal.css";

const BankAccountModal = ({closeModal}) => {
  return (
    <div className="modal_overlay" onClick={closeModal}>
      <div className="modal_content">
        <div className="icon_container">
          <img src={SuccessfullyDone} alt='Check'></img>
        </div>
        <h3 className="success_header">Bank Account Successful</h3>
        <p className="success_details">
          Your bank account has been added successfully
        </p>
        <div className="btn_container">
          <button className="done_btn" onClick={closeModal}>Done</button>
        </div>
      </div>
    </div>
  );
};

export default BankAccountModal;
