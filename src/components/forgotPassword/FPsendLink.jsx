import './FPsendLink.css'
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { toast } from 'react-toastify';

const FPsendLink = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const emailHandler = (e) => {
        setEmail(e.target.value);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch('user/forgotPassword', { email });
            toast.success(response.data.msg);
            navigate('/forgotPassword/resend', { state: { email: email } });
        } catch (err) { toast.error(err.response?.data?.msg || "Something went wrong") };
    }

    return (
        <div className='fpsl'>
            <div className='fpsl-main'>
                <form className='fpsl-form' onSubmit={ submitHandler }>
                    <div className='fpsl-heading'>
                        <h1>Forgot Password</h1>
                        <p>Enter the email associated with your account and we’ll send an email with instruction to reset your password</p>
                    </div>
                        <div className='fpsl-form-field'>
                            <label>Email</label>
                            <input name='email' type='email' placeholder='Enter your email' value={ email } onChange={ emailHandler } required />
                        </div>
                        <button type='submit' className='fpsl-subBtn'>Reset password</button>
                </form>
                <Link to='/login' style={{textDecoration: 'none'}}>
                    <button className='fpsl-back2login'>Back to Login</button>
                </Link>
            </div>
        </div>
    )
};

export default FPsendLink;