import React from 'react';
import { Link } from 'react-router-dom';
import footer from '../../../assets/images/footer.png';

const Footer = () => {
    return (
        <footer className="p-10 mt-14 font-serif"
            style={{
                background: `url(${footer})`,
                backgroundSize: 'cover',
            }}
        >
            <div className='flex flex-col text-center md:flex-row md:justify-around'>
                <div className='flex flex-col'>
                    <span className="footer-title">Services</span>
                    <Link to='/' className="link link-hover">Branding</Link>
                    <Link to='/' className="link link-hover">Design</Link>
                    <Link to='/' className="link link-hover">Marketing</Link>
                    <Link to='/' className="link link-hover">Advertisement</Link>
                </div>
                <div className='flex flex-col'>
                    <span className="footer-title">Company</span>
                    <Link to='/' className="link link-hover">About us</Link>
                    <Link to='/' className="link link-hover">Contact</Link>
                    <Link to='/' className="link link-hover">Jobs</Link>
                    <Link to='/' className="link link-hover">Press kit</Link>
                </div>
                <div className='flex flex-col'>
                    <span className="footer-title">Legal</span>
                    <Link to='/' className="link link-hover">Terms of use</Link>
                    <Link to='/' className="link link-hover">Privacy policy</Link>
                    <Link to='/' className="link link-hover">Cookie policy</Link>
                </div>
            </div>
            <footer className="footer footer-center p-4 mt-12">
                <div>
                    <p className='text-sm font-mono'>Copyright © 2022 - All right reserved by <span className='italic font-bold'>Professor M</span></p>
                </div>
            </footer>
        </footer>
    );
};

export default Footer;