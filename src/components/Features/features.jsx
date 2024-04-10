import React from 'react'
import './features.css'
import feature_1 from '../../assets/feature1.png'
import feature_2 from '../../assets/feature2.jpeg'
import feature_3 from '../../assets/feature3.jpeg'
import feature_icon1 from '../../assets/feature_icon1.png'
import feature_icon2 from '../../assets/feature_icon2.png'
import feature_icon3 from '../../assets/feature_icon3.png'

const Features = () => {
  return (
    <div className='features'>
        <div className='feature'>
            <img src={feature_1} alt="" />
            <div className='caption'>
                <img src={feature_icon1} alt=''/>
                <p>Dashboard</p>
            </div>
        </div>
        <div className='feature'>
            <img src={feature_2} alt="" />
            <div className='caption'>
                <img src={feature_icon2} alt=''/>
                <p>Historical Data</p>
            </div>
        </div>
        <div className='feature'>
            <img src={feature_3} alt="" />
            <div className='caption'>
                <img src={feature_icon3} alt=''/>
                <p>Hourly Forecasts</p>
            </div>
        </div>
    </div>
  )
}

export default Features