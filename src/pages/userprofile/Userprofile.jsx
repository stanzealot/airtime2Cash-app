import React, { useState, useRef } from 'react';
import logo from '../../assets/Frame-8589.png';
import './userprofile.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';
import { toast } from 'react-toastify';
import { NavBar } from '../../components';

export default function Userprofile() {
    const [user, setUser] = useState({ ...JSON.parse(localStorage.getItem('userInfo')), avatar: undefined })
    const [image, setImage] = useState();
    const fileupload = useRef();
    const { id } = useParams();
    const navigate = useNavigate();
    let uploadPromise;


    const handleUpdate = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const name = e.target.name;
        const value = e.target.value;

        if (name !== 'avatar') {
            setUser({ ...user, [name]: value })
        } else {
            const file = fileupload.current.files[0];
            uploadPromise = convertBase64(file)
                .then((result) => {
                    toast.success("File uploaded!")
                    setImage(result);
                })
                .catch(() => toast.error("File upload failed!"))
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        try {
            if (user.avatar) {
                await uploadPromise;
            }
            const response = await axios.patch(`/user/update/${id}`, {
                firstname: user.firstname,
                lastname: user.lastname,
                phonenumber: user.phonenumber,
                avatar: image
            })
            const { firstname, lastname, phonenumber, avatar } = response.data;
            let localUser = JSON.parse(localStorage.getItem('userInfo'))
            localUser = { ...localUser, firstname, lastname, phonenumber, avatar };
            localStorage.setItem('userInfo', JSON.stringify(localUser));
            navigate('/user/dashboard')
            if (response.status === 200) {
                toast.success("Update Successful")
                navigate(`/dashboard/${id}`)
            }
        } catch (err) {
            toast.error("Update Failed")
        }
    };
    
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => { resolve(fileReader.result) };

            fileReader.onerror = (error) => { reject(error) };
        });
    };

    return (
        <>
            <NavBar />
            <div className='profile-container'>
                <div className='header-section'></div> 
                <div action="" className='user-setting'>
                    <div className='form-title'><img src={logo}  alt="logo" /></div>  
                    <form className='user-form' onSubmit={handleSubmit}>

                        <h2 className='user-info'>Basic Information</h2>

                        <label className="user-label" htmlFor="First Name">First Name</label>
                        <input className='formInput form-input' type='text' name='firstname' placeholder='Enter your first name' value={user.firstname} onChange={handleUpdate}></input><br />

                        <label className="user-label" htmlFor="Last Name">Last Name</label>
                        <input className='formInput form-input' type='text' name='lastname' placeholder='Enter your last name' value={user.lastname}  onChange={handleUpdate} /><br />

                        <label className="user-label" htmlFor="Phone Number">Phone Number</label>
                        <input className='formInput form-input' name='phonenumber' type='text' placeholder='Enter your phone number' 
                            value={user.phonenumber}  onChange={handleUpdate} /><br />
                        
                        <label className='user-label fileupload' htmlFor="avatar">Change Avatar
                        <input className='formInput form-input' name='avatar' id='avatar' ref={fileupload} type='file' value={user.avatar}   onChange={handleUpdate} /></label><br/>
                        {/* eslint-disable-next-line no-useless-escape*/}
                        {image && <div className='currentfile'>{fileupload.current.value.split(/[\/\\]/).pop()}</div>}
                        <button id={user} className='saveBtn' disabled={!user}  type='submit'>Save</button>
                    </form>   
                </div>     
            </div>
        </>
    )
};
