import React, { useState } from 'react';
import './modal.css';
import { NavBar, UserAvatar } from '../';
import { FaTimes } from 'react-icons/fa';

const Modal = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => { setShow(!show) };

  return (
    <>
      <NavBar/>
      <button className='modal-btn' onClick={handleShow}>Account</button>
      <div className='user-modal'>
        <div className='btn-div'></div> 
        <button className='close-modal-btn'><FaTimes></FaTimes></button>
        <div className='modal-container'>
          <div>
            {show ? "" : <UserAvatar/>} 
          </div>
        </div>
      </div>
    </>  
  )
};

export default Modal;

