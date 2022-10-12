import './FPcheckMail.css'
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import CMicon from '../../assets/checkMail.svg';
import axios from '../../axios';
import { toast } from 'react-toastify';

const FPcheckMail = () => {
    const { state } = useLocation();
    const email = state.email;
    const resendHandler = async () => {
        try {
            const response = await axios.patch('user/forgotPassword', { email });
            toast.success(response.data.msg);
        } catch (err) { toast.error(err.response?.data?.msg || console.error(err) || "Something went wrong") };
    }
    return (
        <div className='fpcm'>
            <img src={ CMicon } alt='check email icon' />
            <h1>Check your email</h1>
            <p className='fpcm-text'>We sent a password reset link to your email. Please click the link to reset your password</p>
            <p className='fpcm-rslink'>Don’t receive the email? <span onClick={ resendHandler } style={{color: '#DF3E6E', cursor: 'pointer'}}>Click to Resend link</span></p>
            <Link to='/login' style={{ textDecoration: 'none' }}>
                <button className='fpcm-back2login'>Back to Login</button>            
            </Link>
        </div>
    )
};

export default FPcheckMail;