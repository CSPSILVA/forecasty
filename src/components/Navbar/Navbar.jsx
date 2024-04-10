import React, { useEffect, useState } from 'react'
import {Link} from 'react-scroll'
import './Navbar.css'
import logo from '../../assets/logo.png'

const Navbar = () => {

    const [sticky, setSticky] = useState(false);

    useEffect(()=>{
        window.addEventListener('scroll', ()=>{
            window.scrollY > 500 ? setSticky(true) : setSticky(false);
        })
    },[])

  return (
    <nav className={`container ${sticky? 'dark-nav' : ''}`}>
        <img src={logo} alt="Logo" className='logo' />
        <ul>
            <li><Link to='hero' smooth={true} offset={0} duration={500}>Home</Link></li>
            <li><Link to='features' smooth={true} offset={-150} duration={500}>What we Offer</Link></li>
            <li><Link to='forecast-col' smooth={true} offset={-260} duration={500}>Hourly Forecasts</Link></li>
            <li><Link to='programs' smooth={true} offset={-260} duration={500}>About us</Link></li>
            <li><Link to='contact' smooth={true} offset={-260} duration={500}>Contact us</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar