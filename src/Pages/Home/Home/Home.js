import React from 'react';
import Banner from '../Banner/Banner';
import InfoCards from '../InfoCards/InfoCards';
import MakeAppointment from '../MakeAppointment/MakeAppointment';
import Services from '../Services/Services';
import bg from '../../../assets/images/bg.png'
import Testimonials from '../Testimonial/Testimonials';

const Home = () => {
    return (
        <div className='mx-5'>
            <div style={{ background: `url(${bg})` }}>
                <Banner></Banner>
                <InfoCards></InfoCards>
            </div>
            <Services></Services>
            <MakeAppointment></MakeAppointment>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;