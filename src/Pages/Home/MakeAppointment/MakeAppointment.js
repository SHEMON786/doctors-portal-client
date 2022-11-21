import React from 'react';
import doctor from '../../../assets/images/doctor.png'
import appointment from '../../../assets/images/appointment.png'
import ButtonPrimary from '../../../Components/ButtonPrimary';

const MakeAppointment = () => {
    return (
        <section className='mt-40'
            style={{ background: `url(${appointment})` }}
        >
            <div className="hero">
                <div className="hero-content p-0 flex-col lg:flex-row">
                    <img src={doctor} className="rounded-lg shadow-2xl -mt-32 lg:w-1/2 hidden md:block" alt='' />
                    <div>
                        <h1 className="text-xl font-bold text-secondary">Appointment</h1>
                        <h1 className="text-4xl font-semibold my-5 text-white">Make an appointment Today</h1>
                        <p className="py-6 text-white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page.</p>
                        <ButtonPrimary>Get Started</ButtonPrimary>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAppointment;