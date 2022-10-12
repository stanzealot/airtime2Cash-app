import React from 'react'
import './showcase.scss';
import showcaseImage  from "../../assets/showcaseImage.png"
import {NavLink} from "react-router-dom"

function Showcase() {
    return (
        <div className='showcase-container'>
            <div className='showcase-hero'>
                <section className='showcase-pitch'>
                    <h1 className='showcase-heading'>
                        Surplus Airtime? Don't worry we got you covered
                    </h1>
                    <p className='showcase-description'>Sell your airtime for cash, withdraw from your wallet anytime. You'll never have to waste call credits again!</p>
                    <NavLink to="/register" className='showcase-button'>Get Started</NavLink>
                </section>
                <section className='showcase-image'>
                    <img src={showcaseImage} alt="showcase" className='showcase-img'/>
                </section>
            </div>
        </div>
    )
}

export default Showcase

