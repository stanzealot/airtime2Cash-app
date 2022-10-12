import React, { useState, useEffect } from 'react'
import vector from "../../assets/vector.png"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import UserProfileNav from './UserProfileNav'
import Hamburger from 'hamburger-react'


function Navbar({ dashboard, Landing }) {
  const [isLogin, setIsLogin] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [name, setName] = useState(undefined);
  const [isOpen, setOpen] = useState(false)

  const userDetails = localStorage.getItem('userInfo');
  const data = JSON.parse(userDetails);

  useEffect(() => {
    if (userDetails) {
      setIsLogin(true);
      setName(data.username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavbarStyle>
      <div className='Navbar-container'>
        <div className='Navbar-brand'>
          <img src={vector} alt='logo' className='logo' />
          <NavLink to="/" className='subject'>Airtime<span>2Cash</span></NavLink>
        </div>
        {Landing &&
          <div className="hmg">
            <Hamburger

              onToggle={toggled => {
                if (toggled) {
                  // open a menu
                  setOpen(true)
                } else {
                  // close a menu
                  setOpen(false)
                }
              }}
            />
          </div>

        }

        <div className={isOpen ? "mobile-nav" : 'Navbar-menu'} >
          {
            Landing &&
            <>
              <NavLink to="/" className='selected menu-link' onClick={() => setOpen(false)}>Home</NavLink>
              <NavLink to="/about" className='menu-link' onClick={() => setOpen(false)}>About Us</NavLink>
              <NavLink to="/products" className='menu-link' onClick={() => setOpen(false)}>Products</NavLink>
              <NavLink to="/contact" className='last menu-link' onClick={() => setOpen(false)}>Contact Us</NavLink>
            </>
          }
          {(isLogin && Landing && !dashboard) && <UserProfileNav dashboard={dashboard} loginStatus={setIsLogin} />}
          {!isLogin && <NavLink to="/Login" className='btnLogin'>Login</NavLink>}
        </div>
        {(isLogin && dashboard) && <UserProfileNav dashboard={dashboard} loginStatus={setIsLogin} />}
      </div>
    </NavbarStyle>
  )
};


const NavbarStyle = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 96px;
  background: #FFFFFF;
  position:relative;
  top:0;
  left:0;
  right:0;
  z-index:3;

  .Navbar-container{
    display: flex;
    justify-content:space-between;
    align-items:center;
    max-width: 85%;
    margin: 12px auto;
    over-flow:hidden;
    
    .hmg{
      position:absolute;
      top:0.8rem;
      right:2rem;
      display:none;
    }
  }
  .Navbar-brand{
    display: flex;
    align-items:center;
    justify-content:space-between;

    .logo {
      width: clamp(30px, 4vw, 60px)
      height: clamp(30px, 4vw, 60px)
    }

    .subject{
      font-style: normal;
      font-weight: 600;
      font-size: clamp(16px, 4vw, 30px);
      color: #DE3D6D;
      line-height: 39px;
      margin-left:16.39px;
      text-decoration:none;

      span{
        color:#F5844C;
      }
    }
  }

  .Navbar-menu{
    display:flex;
    justify-content:space-between;
    align-items:center;
    
    a{
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      color: #012A4A;
      text-decoration:none;
      margin-left:2em;
    }

    .last{
      margin-right:1em;
    }

    .selected{
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      color: #DE3D6D;
    }

    .btnLogin{
      text-decoration:none;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 10px;
      gap: 10px;    
      background: linear-gradient(101.31deg, #DE3D6D 42.62%, #F5844C 104.19%);
      border-radius: 4px;
      border:none;
      width:100px;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #FFFFFF;
      margin-left:2em;
    }
  
  }

  @media (max-width:950px){
    .Navbar-menu{
      display:none;
    }

    .Navbar-container{
      .hmg{
        display:block;
      }
    }

    .mobile-nav{
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: absolute;
      align-items: center;
      width: 100%;
      top:96px;
      background:#fff;
      over-flow:none;
      padding-bottom:2rem;
      box-shadow: 5px 5px 5px 5px #888888;
      padding:2rem;

      a.btnLogin {
        text-decoration:none;
        color: #de3d6d;
      }
    }

    .menu-link{
      text-decoration:none;
      color: #012A4A;
      margin-bottom:1rem;
    }
  }

  @media (max-width:378px){
    .Navbar-brand .subject{
      margin-left:0.1rem;
      font-size:0.8rem;
    }

    .Navbar-container{
      width:100%;
    }
  }
    
`;

export default Navbar