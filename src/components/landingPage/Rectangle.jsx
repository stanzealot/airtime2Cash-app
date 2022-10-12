import React from 'react'
import iphone from '../../assets/iphone.png'
import Frame from '../../assets/Frame.png'
import './rectangle.scss';
import { useNavigate } from 'react-router-dom';

function Rectangle() {
    const navigate = useNavigate();  
    return (
        <div className='rect-container'>
            <div className='rect-colors'>
                <div className='ellipse23'></div>
                <div className='ellipse24'></div>
                <div className='ellipse25'></div>
            </div>
            <div className='rect-text'>
                <h1 className='rect-title'>The best Platform for your convenient airtime exchange</h1>
                <p className='rect-description'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium assumenda totam consequatur vitae perferendis quidem!</p>
                <button className='rect-cta' onClick={() => { navigate('/register')}}>Get Started</button>
            </div>
            <div className='rect-graphic'>
                <div className='mock-frame'>
                    <img className="mock-phone" src={iphone} alt="iphone in hand" />
                    <img className="mock-screen" src={Frame} alt="Frame" />
                </div>             
            </div> 
        </div>
    )
}

export default Rectangle