import React from 'react'
import './reviews.scss';
import LeftArrow from "../../assets/LeftArrow.png"
import RightArrow from "../../assets/RightArrow.png"

function Reviews() {
    return (
    <div className='reviews-container'>
        <div className='testimonials-container'>
            <div className='testimonials-heading'>
                <h1 className='testimonials-title'>Hear what our customers are saying</h1>
                <p className='testimonials-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat laudantium necessitatibus ea mollitia sed rerum?</p>
            </div>
            <div className='reviews-container'>
                <div className='testimonials-bar'>
                    <img src={LeftArrow} alt="left arrow" className='leftimg'/>
                    <img src={RightArrow} alt="right arrow" className='rightimg'/>
                </div>
                <div className='reviews'>
                    <div className='review-box'>
                        <h1 className='review-title'>Adekola Johnson</h1>
                        <p className='review-text'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Cumque aliquam magnam explicabo consectetur adipisci, 
                            quaerat tempore nisi incidunt dolorum officiis!
                        </p>
                    </div>
                    <div className='review-box'>
                    <h1 className='review-title'>Adekola Johnson</h1>
                        <p className='review-text'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Cumque aliquam magnam explicabo consectetur adipisci, 
                            quaerat tempore nisi incidunt dolorum officiis!
                        </p>
                    </div>
                    <div className='review-box'>
                    <h1 className='review-title'>Adekola Johnson</h1>
                        <p className='review-text'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Cumque aliquam magnam explicabo consectetur adipisci, 
                            quaerat tempore nisi incidunt dolorum officiis!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Reviews