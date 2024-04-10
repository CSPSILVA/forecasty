import React from 'react'
import './Programs.css'
import program_1 from '../../assets/programs1.png'
import program_2 from '../../assets/programs2.png'
import program_3 from '../../assets/programs3.png'
import program_4 from '../../assets/programs4.png'


const Programs = () => {
  return (
    <section className='programs'>
        <div className='program-item'>
            <img src={program_1} alt='Maximize Energy' />
            <h3>Maximize Solar Energy Utilization: </h3>
            <p>Forecasty offers detailed hourly forecasts that enable you to make the most of solar energy production during peak hours. This means you can plan your energy consumption more effectively, ensuring you use solar power when it's most abundant and cost-effective.</p>
        </div>
        <div className='program-item'>
            <img src={program_2} alt='Enhance Efficiency' />
            <h3>Enhance Energy Efficiency: </h3>
            <p>With precise forecasting, you can better manage your solar energy storage, reducing reliance on the grid and minimizing energy costs. Forecasty's insights help identify the best times to charge or discharge your solar batteries, optimizing energy efficiency.</p>
        </div>
        <div className='program-item'>
            <img src={program_3} alt='Support Living' />
            <h3>Support Sustainable Living: </h3>
            <p>By using Forecasty, you're taking a step towards more sustainable energy consumption. The platform encourages the use of renewable solar power, contributing to a reduction in carbon footprint and promoting environmental sustainability.</p>
        </div>
        <div className='program-item'>
            <img src={program_4} alt='Financial Savings' />
            <h3>Improve Financial Savings:</h3>
            <p>Forecasty can help you understand solar energy patterns, allowing for smarter decisions that lead to significant cost savings. By optimizing when and how you use solar power, you can lower your electricity bills and achieve better returns on your solar investment.</p>
        </div>
    </section>
  )
}

export default Programs