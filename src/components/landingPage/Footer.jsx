import React from 'react'
import styled from 'styled-components'
import LogoFooter from '../../assets/LogoFooter.png'
import Twitter from '../../assets/Twitter.png'
import Instagram from '../../assets/Instagram.png'
import Youtube from '../../assets/Youtube.png'

function Footer() {
  return (
    <FooterStyle>
        <div className='footer-container'>
            <div className='logo'>
                <img src={LogoFooter} alt="Logo"/>
            </div>
            <div className='footer-menu'>
                <a href='/'>Home</a>
                <a href='/'>About</a>
                <a href='/'>Airtime2Cash</a>
                <a href='/'>Contact</a>
            </div>
            <div className='bottom'>
                <div className='divider'></div>
                <div className='down'>
                    <p> &copy; 2022 Airtime2Cash, All rights reserved</p>
                    <div className='social'>
                        <img src={Instagram} alt="Instagram" />
                        <img src={Twitter} alt="Twitter" />
                        <img src={Youtube} alt="Youtube" />
                    </div>                    
                </div>
            </div>
        </div>
    </FooterStyle>
  )
}

const FooterStyle = styled.div`
    width:100%;
    max-width: 100%;
    margin-top:80px;
    overflow:hidden;
    display: flex;
    align-items: flex-start;

    .footer-container{
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
        align-items: center;
        gap: 34px;
        max-width: 100%;
        min-width: 100%;
        margin: 0;
        padding: 5%;
        padding-top: 40px;
        background: #21334F;
        
        .logo{
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 0px;
            gap: 16px;
            width: 269px;
            height: 70px;
        }
        .footer-menu{
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 40px;
            flex-wrap: wrap;
            justify-content: space-evenly;

            a{
                text-decoration:none;
                height: 26px;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 26px;
                color: #F2F2F2;
            }
            
        }
    }
    .bottom{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 23px;
        min-height: max-content;
        padding-left: 5%;
        padding-right: 5%;
        padding-bottom: 30px;
        
        .divider{
            width: 100%;
            height: 1px;
            background: #FFFFFF;
            opacity: 0.2;
        }
        .down{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 30px;
            box-sizing: border-box;
            margin-bottom: 20px;

            p{
                height: 24px;
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 24px;
                color: #FFFFFF;
            }
            .social{
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 0px;
                gap: 16px;
                width: 104px;
                height: 24px;
              
            }
        }
    }

`
export default Footer