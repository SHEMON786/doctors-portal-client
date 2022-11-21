import React from 'react';
import cavity from '../../../assets/images/cavity.png'
import fluoride from '../../../assets/images/fluoride.png'
import whitening from '../../../assets/images/whitening.png'
import Service from './Service';

const Services = () => {

    const servicesData = [
        {
            _id: 1,
            title: 'Fluoride Treatment',
            image: fluoride,
            description: 'Fluoride varnish can be applied to both baby teeth and adult teeth by a dentist.'
        },
        {
            _id: 2,
            title: 'Cavity Filling',
            image: cavity,
            description: 'The process of filling cavities is a simple one that can be done at your dentist office.'
        },
        {
            _id: 3,
            title: 'Teeth Whitening',
            image: whitening,
            description: 'Tooth whitening  is the process of lightening the color of human teeth.'
        },
    ]

    return (
        <div className='mt-24'>
            <div>
                <h2 className='text-xl font-bold text-secondary text-center'>Our Services</h2>
                <h1 className='text-center text-4xl text-accent'>Services We Provide</h1>
            </div>
            <div className='grid gap-[34px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    servicesData.map(data => <Service
                        key={data._id}
                        data={data}
                    ></Service>)
                }
            </div>
        </div>
    );
};

export default Services;