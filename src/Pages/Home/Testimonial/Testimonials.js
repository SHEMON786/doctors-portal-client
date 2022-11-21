import React from 'react';
import quote from '../../../assets/icons/quote.svg'
import people1 from '../../../assets/images/people1.png';
import people2 from '../../../assets/images/people2.png';
import people3 from '../../../assets/images/people3.png';
import Testimonial from './Testimonial';

const Testimonials = () => {

    const testimonialData = [
        {
            _id: 1,
            name: 'Winson Herry',
            address: 'California',
            review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            img: people1
        },
        {
            _id: 2,
            name: 'Winson Herry',
            address: 'California',
            review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            img: people2
        },
        {
            _id: 3,
            name: 'Winson Herry',
            address: 'California',
            review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
            img: people3
        },
    ]

    return (
        <section className='mt-20 mx-14'>
            <div className='flex justify-between'>
                <div>
                    <h2 className='text-secondary font-bold text-xl mb-2'>Testimonial</h2>
                    <h1 className='text-4xl text-accent'>What Our Patients Says</h1>
                </div>
                <figure>
                    <img className='w-24 lg:w-48' src={quote} alt="" />
                </figure>
            </div>
            <div className='mt-16 grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    testimonialData.map(data => <Testimonial
                        key={data._id}
                        data={data}
                    ></Testimonial>)
                }
            </div>
        </section>
    );
};

export default Testimonials;