import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faEnvelope, faPhone, faClock } from "@fortawesome/free-solid-svg-icons";
const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit =() =>{

  }


  return (
    <>

      <section id="contact-details" className="section-p1">
        <div className="details">
          <span>GET IN TOUCH</span>
          <h2>Visit our location or contact us today</h2>
          <h3>Head Office</h3>
          <ul>
            <li><FontAwesomeIcon className ="i1" icon={faMap} /> Basantapur, Paschim Mednapore, West Bengal, India</li>
            <li><FontAwesomeIcon className ="i1" icon={faEnvelope} /> knotandlove156@gmail.com</li>
            <li><FontAwesomeIcon className ="i1" icon={faPhone} /> +91 7477430863</li>
            <li><FontAwesomeIcon className ="i1" icon={faClock} /> Monday to Saturday 10 AM to 7 PM</li>
          </ul>
        </div>
        
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7619.812539241674!2d87.4883237372711!3d22.39715973840916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d4d9b5745d75b%3A0xea06e9d5c4ab3979!2sMadhusudhan%20Rice%20Mill%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1730126058471!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
      </section>

      <section id="form_details">
        <form onSubmit={handleSubmit}>
          <span>LEAVE A MESSAGE</span>
          <h2>We love to hear from you</h2>
          <input type="text" name="name" placeholder="Enter Your Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Enter Your Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
          <textarea name="message" rows="10" cols="30" placeholder="Your Message" value={formData.message} onChange={handleChange} required></textarea>
          <button className="newsletterbutton" type="submit">Submit</button>
        </form>
        
        <div className="people">
          <div>
            <img src="img/people/1.png" alt="Pabitra Pramanik" />
            <p><span>Pabitra Pramanik</span> Owner<br />Phone: +91 7477430863<br />Email: pramanikpabitra@gmail.com</p>
          </div>
          <div>
            <img src="img/people/3.png" alt="Bidisha Pal" />
            <p><span>Bidisha Pal</span> Senior Designer<br />Phone: +91 8653919864<br />Email: bidisha.pal05@gmail.com</p>
          </div>
          <div>
            <img src="img/people/2.png" alt="Deep Jana" />
            <p><span>Satyapal Sing</span> Delevery Managerr<br />Phone: +91 7390902387<br />Email: 2205101130094@paruluniversity.ac.in.com</p>
          </div>
          <div>
            <img src="img/people/2.png" alt="Deep Jana" />
            <p><span>Deep Jana</span> Senior Marketing Manager<br />Phone: +91 8653919865<br />Email: deep.jana@example.com</p>
          </div>
        </div>
      </section>
    </>
  )
}


export default Contact
