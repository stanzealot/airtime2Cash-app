import React,{useState} from 'react';
import styled from 'styled-components';
import { FiChevronDown } from 'react-icons/fi';
import helpCenter from '../../assets/helpCenter.svg';
import settings from '../../assets/settings.svg';
import logoutIcon from '../../assets/logoutIcon.svg';
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";
import { useAuth } from "../../hooks/useAuth";
import { toast } from 'react-toastify';
import { UserAvatar } from '../';

function UserProfileNav({dashboard, setIsLogin}) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { avatar, id, username } = JSON.parse(localStorage.getItem('userInfo'))
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get('/user/logout')
      if (res) {
        toast.success("Logged out successfully");
        logout();
        localStorage.removeItem('userInfo')
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  const userIcon = "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' data-name='Layer 1' viewBox='0 0 24 24'%3e%3cpath fill='%23F5844C' d='M12,2A10,10,0,0,0,4.65,18.76h0a10,10,0,0,0,14.7,0h0A10,10,0,0,0,12,2Zm0,18a8,8,0,0,1-5.55-2.25,6,6,0,0,1,11.1,0A8,8,0,0,1,12,20ZM10,10a2,2,0,1,1,2,2A2,2,0,0,1,10,10Zm8.91,6A8,8,0,0,0,15,12.62a4,4,0,1,0-6,0A8,8,0,0,0,5.09,16,7.92,7.92,0,0,1,4,12a8,8,0,0,1,16,0A7.92,7.92,0,0,1,18.91,16Z'/%3e%3c/svg%3e"

  const route = () => {
    navigate(`/userprofile/${id}`)
  };

  return (
    <Profile >
        <img onClick={setShowModal.bind(null, true)} style={{borderRadius:"50%", width:"40px",height:"40px" }} 
          src={avatar || userIcon}
        alt='Profile Pic'
        className='profile-avatar-img's/>
        <span>{username}</span>
          <>
            <FiChevronDown onClick={()=>setShowDropdown(!showDropdown)}/>
            <Dropdown showDropdown={showDropdown}>
              <Link to={`/dashboard/${id}`} style={{textDecoration: 'none'}}><DropdownItem><img className='dropdown-img' src={avatar || userIcon} alt="" onClick={setShowModal.bind(null, true)}/><span>Account</span></DropdownItem></Link>
              <DropdownItem><img src={settings} alt='settings' /><span onClick={route}>Settings</span></DropdownItem>
              <DropdownItem><img src={helpCenter} alt='help center' /><span>Help Center</span></DropdownItem>
              <DropdownItem><img src={logoutIcon} alt='logout'/><span onClick={handleLogout}>Logout</span></DropdownItem>
            </Dropdown>
          </>
      {showModal && <UserAvatar close={setShowModal.bind(null, false)}/>}
    </Profile>
  )
};

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap:10px;
  cursor: pointer;

  &.profile-avatar-img {
    width: 36px;
    border-radius: 50%;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 7%;
  background-color: #fff;
  width: 226px;
  height: 180px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  z-index: 100;
  display: ${({ showDropdown }) => (showDropdown ? 'block' : 'none')};
  transition: all 0.3s ease-in-out;  
  
  &.active {
      display: block;
  }
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: #21334F;
  font-weight: lighter;
  margin: 15px 20px;

  & .dropdown-img {
    width: 24px;
  }
`;

export default UserProfileNav;