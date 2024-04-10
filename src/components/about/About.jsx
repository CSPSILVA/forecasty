import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className='about'>
        <div className='about-left'>
            <img src={about_img} alt='' className='about-img'/>
            <img src={play_icon} alt='' className='play-icon'/>
        </div>
        <div className='about-right'>
            <h3>About Us</h3>
            <h2></h2>
            <p></p>
        </div>

    </div>
  )
}

export default About