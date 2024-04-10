import React from 'react'
import './Hero.css'


const Hero = () => {
  return (
    <div className='hero container'>
        <div className='hero-text'>
            <h1>Welcome to Forecasty</h1>
            <p>Forecasty, your go-to hourly solar power forecasting website, 
            offers precise, real-time predictions to optimize your solar energy 
            utilization. Leveraging cutting-edge technology, we provide actionable 
            insights that empower individuals and businesses to harness the power 
            of the sun more efficiently.</p>
            <button className='btn'>Explore more</button>

        </div>
    </div>
  )
}

export default Hero