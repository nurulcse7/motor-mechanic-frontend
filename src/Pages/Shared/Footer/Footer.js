import React from 'react';
import logo from '../../../assets/Logo1 (4).png';
import footer from '../../../assets/images/footer.png';

const Footer = () => {
    return (
        <footer className="footer p-24 bg-base-200 text-white"
        style={{
            background: `url(${footer})`,
            backgroundSize: 'cover',
          }}
        >
            <div>
                <img src={logo} alt="" />
                <p>Motor Mechanic Ltd.<br/>
                Copyright © 2022 - by Motor Mechanic
                </p>
            </div>
            <div>
                <span className="footer-title">Services</span>
                <a href="/"className="link link-hover">Branding</a>
                <a href="/"className="link link-hover">Design</a>
                <a href="/"className="link link-hover">Marketing</a>
                <a href="/"className="link link-hover">Advertisement</a>
            </div>
            <div>
                <span className="footer-title">Company</span>
                <a href="/"className="link link-hover">About us</a>
                <a href="/"className="link link-hover">Contact</a>
                <a href="/"className="link link-hover">Jobs</a>
                <a href="/"className="link link-hover">Press kit</a>
            </div>
            <div>
                <span className="footer-title">Legal</span>
                <a href="/"className="link link-hover">Terms of use</a>
                <a href="/"className="link link-hover">Privacy policy</a>
                <a href="/"className="link link-hover">Cookie policy</a>
            </div>
        </footer>
    );
};

export default Footer;