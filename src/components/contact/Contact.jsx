import React from 'react'
import './Contact.css'
import msg_icon from  '../../assets/msg-icon.png'
import mail_icon from  '../../assets/mail-icon.png'
import phone_icon from  '../../assets/phone-icon.png'
import location_icon from  '../../assets/location-icon.png'
import white_arrow from  '../../assets/white-arrow.png'


const Contact = () => {
    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "0507abf6-3714-45b1-8279-a81b06b7826f");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
            }).then((response) => response.json());


        if (response.success) {
            console.log("Form Submitted Successfully", response);
            setResult(response.message);
            event.target.reset();
        } else {
            console.log("Error", response);
            setResult(response.message);
        }
    };

  return (
    <div className='contact'>
        <div className="contact-col">
            <h3>Send us a message<img src={msg_icon} alt="" /></h3>

            <p>Feel free to reach out through contactform or find our contact
            information below.Your feedback, questions, and suggestions are
            important to us as we strive to provide exceptionl service to our
            university community.</p>
            <ul>
                <li><img src={mail_icon} alt="" />cspsilva8@gmail.com</li>
                <li><img src={phone_icon} alt="" />+94756914280</li>
                <li><img src={location_icon} alt="" />58, Marine Drive Road, Colombo 5<br/> 10200, Sri Lanka</li>
            </ul>
        </div>
        <div className="contact-col">
            <form onsubmit={onSubmit}>
                <label>Your Name</label>
                <input type="text" name='name' placeholder='Enter your name' required/>
                <label>Phone Number</label>
                <input type="tel" name='phone' placeholder='Enter your mobile number' required/> 
                <label>Write your Message Here</label>
                <textarea name="message" id="" rows="6" placeholder='Enter your message'></textarea>
                <button type='submit' className='btn dark-btn'>Submit Now<img src={white_arrow} alt=""/></button>
            </form>
            <span>{result}</span>
        </div>
    </div>
  )
}

export default Contact