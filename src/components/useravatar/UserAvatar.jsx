import React, { useState, useRef } from 'react'
import axios from '../../axios';
import { toast } from 'react-toastify';
import './useravatar.css'
import { Button } from '../';


export default function UserAvatar({ close }) {
    const [user] = useState(JSON.parse(localStorage.getItem('userInfo')))
    const [image, setImage] = useState(user.avatar || "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' data-name='Layer 1' viewBox='0 0 24 24'%3e%3cpath fill='%23F5844C' d='M12,2A10,10,0,0,0,4.65,18.76h0a10,10,0,0,0,14.7,0h0A10,10,0,0,0,12,2Zm0,18a8,8,0,0,1-5.55-2.25,6,6,0,0,1,11.1,0A8,8,0,0,1,12,20ZM10,10a2,2,0,1,1,2,2A2,2,0,0,1,10,10Zm8.91,6A8,8,0,0,0,15,12.62a4,4,0,1,0-6,0A8,8,0,0,0,5.09,16,7.92,7.92,0,0,1,4,12a8,8,0,0,1,16,0A7.92,7.92,0,0,1,18.91,16Z'/%3e%3c/svg%3e");
    const fileupload = useRef();
    const { id } = user;
    let uploadPromise;

    const hide = () => {
        close();
    };

    const handleUpdate = (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        const file = fileupload.current.files[0];
        uploadPromise = convertBase64(file)
            .then((result) => {
                toast.success("File uploaded!")
                setImage(result);
            })
            .catch(() => toast.error("File upload failed!"))
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        try {
            if (!image) {
                await uploadPromise;
            }
            const response = await axios.patch(`/user/update/${id}`, { avatar: image })
            if (response.status === 200) {
                toast.success("Update Successful")
                const avatar = response.data.avatar;
                console.log(avatar)
                const localUser = JSON.parse(localStorage.getItem('userInfo'))
                localUser.avatar = avatar;
                localStorage.setItem('userInfo', JSON.stringify(localUser));
            }
        } catch (err) {
            toast.error("Update Failed")
        }
    };
    
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleContainerClick = (e) => {
        e.stopPropagation();
    }

    return (
        <div className='user-modal' onClick={hide}>
            <div className='user-container' onClick={handleContainerClick}>
                <img className='profile' onClick={() => {fileupload.current.click()}} src={image} alt="" />
                <h1>{user.firstname} {user.lastname}</h1>
                <form onSubmit={handleSubmit}>
                    <label className='user-label fileupload' htmlFor="avatar">
                        <input className='formInput form-input' name='avatar' id='avatar' ref={fileupload} type='file' onChange={handleUpdate} />
                    </label><br />
                    <Button className='saveBtn' disabled={false} type='submit'>Save</Button>
                </form>
            </div>
        </div>
    )
};
