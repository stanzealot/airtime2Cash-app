import React from "react";
import SuccessfullyDone from "../../assets/SuccessfullyDone.png";
import "./NotifyAdminModal.css";

const BankAccountModal = ({closeModal}) => {
  return (
    <div className="modal_overlay" onClick={closeModal}>
      <div className="modal_content">
        <div className="icon_container">
          <img src={SuccessfullyDone} alt='Check'></img>
        </div>
        <h3 className="success_header">Admin has been notified</h3>
        <p className="success_details">"Your wallet would be credited soon"</p>
        <div className="btn_container">
          <button className="done_btn" onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default BankAccountModal;
