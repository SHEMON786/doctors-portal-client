import React from 'react';

const Testimonial = ({ data }) => {
    const { name, img, review, address } = data;

    return (
        <section>
            <div className="card shadow-xl">
                <div className="card-body">
                    <p>{review}</p>
                    <div className="card-actions items-center mt-9">
                        <div className="avatar">
                            <div className="w-16 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                                <img src={img} alt='' />
                            </div>
                        </div>
                        <div className='ml-4'>
                            <h3 className='text-accent text-xl font-semibold'>{name}</h3>
                            <p>{address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;