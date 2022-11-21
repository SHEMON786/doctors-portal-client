import React from 'react';
import chair from '../../../assets/images/chair.png'
import ButtonPrimary from '../../../Components/ButtonPrimary';

const Banner = () => {
    return (
        <div className="hero">
            <div className="hero-content my-28 flex-col lg:flex-row-reverse">
                <img src={chair} className="rounded-lg shadow-2xl lg:w-1/2" alt='' />
                <div>
                    <h1 className="text-5xl font-bold">Your New Smile Starts Here</h1>
                    <p className="py-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>
                    <ButtonPrimary>Getting Started</ButtonPrimary>
                </div>
            </div>
        </div>
    );
};

export default Banner;