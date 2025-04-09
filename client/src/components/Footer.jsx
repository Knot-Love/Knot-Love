import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
const Footer = () => {
  return (
    <footer class="section-p1">
    <div class="col">
        <h3>Contact</h3>
        <p><strong>Phone :</strong>+91 7477430863<br/>
        <br/><strong>Hours :</strong>10:00 AM - 10:00 PM , Mon - Sat</p>
        <div class="follow"><h3>Follow Us !</h3>
            <div class="social">
            <FaFacebook />
            <Link to={"https://www.instagram.com/knot_love156/?utm_source=ig_web_button_share_sheet"}><FaInstagramSquare /></Link>
            <Link to={"https://wa.me/qr/BWVPACISGT74H1" }><IoLogoWhatsapp /></Link>
            
            </div>
        </div>
    </div>
    <div class="col">
        <h3>About</h3>
        <Link to={"/Contact"} className='  hover:text-cyan-800'>About Us</Link>
        <Link to={"/PrivacyPolicy"} className='  hover:text-cyan-800'>Privacy Policy</Link>
        <Link to={"/TermsAndConditions"} className='  hover:text-cyan-800'>Terms And Conditions</Link>
        
    </div>
    <div class="col">
        <h3>My Account</h3>
        <Link to={"/Login"} className='  hover:text-cyan-800'>Sign In</Link>
        <Link to={"/Register"} className='  hover:text-cyan-800'>Sign Up</Link>
    </div>
</footer>
  )}

export default Footer
