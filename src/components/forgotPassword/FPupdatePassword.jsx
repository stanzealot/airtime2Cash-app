import './FPupdatePassword.css'
import FPlogo from '../../assets/FPlogo.svg'
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';
import { toast } from 'react-toastify';

const FPupdatePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }

    const confirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value);
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        // eslint-disable-next-line no-unused-expressions
        (password !== confirmPassword) ? toast.error('Password and Confirm Password must be same') : null;
        
        try {
            const response = await axios.patch(`user/resetPassword/${id}`, { password });
            toast.success(response.data.msg);
            navigate('/login');
        } catch (err) { toast.error(err.response?.data?.msg || "Something went wrong") }
    }

    return (
        <div className='fpup'>
            <div className='fpup-main'>
                <div className='fpup-logo'>
                    <img src={FPlogo} alt='Airtime2Cash logo' />
                    <p>Airtime<span style={{color: '#F5844C'}}>2Cash</span></p>
                </div>
                <div className='fpup-form-group'>
                    <h1>Reset password</h1>
                    <form className='fpup-form' onSubmit={submitHandler}>
                        <div className='fpup-form-fields'>
                            <div className='fpup-form-fields1'>
                                <label>New password</label>
                                <input name='password' type='password' placeholder='Enter your new password' value={password} onChange={passwordHandler} required />
                            </div>
                            <div className='fpup-form-fields2'>
                                <label>Confirm password</label>
                                <input name='confirmPassword' type='password' placeholder='Confirm your new password' value={confirmPassword} onChange={confirmPasswordHandler} required />
                            </div>
                        </div>
                        <button type='submit' className='fpup-subBtn'>Reset Password</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default FPupdatePassword;