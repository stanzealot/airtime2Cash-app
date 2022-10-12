import React from 'react'
import { Footer, NavBar, Rectangle, Reviews, Showcase, Surplus } from '../../components'
import "./Landing.css"

function Landing() {
  return (
    <div className='Home'>
      <NavBar Landing/>
      <Showcase />
      <Surplus />
      <Rectangle />
      <Reviews />
      <Footer />
    </div>
  )
};

export default Landing;
