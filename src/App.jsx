import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/hero/Hero'
import Programs from './components/programs/Programs'
import Features from './components/Features/features'
import Title from './components/title/Title'
import Contact from './components/contact/Contact'
import ForecastForm from './components/forecastform/ForecastForm'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <div className='contain'>
        <Title subtitle='About Us' title='Why Do You Need Forecasty?'/>
        <Programs/>
      </div>
      <div className='container'>
        <Title title='What We Offer'/>
        <Features/>
        <Title subtitle='Hourly' title='Solar Power Forecast'/>
        <ForecastForm />
        <Title subtitle='Contact Us' title='Get in Touch'/>
        <Contact/>
      </div>
    </div>
  )
}

export default App