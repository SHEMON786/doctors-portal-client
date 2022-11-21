import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckOut from './CheckOut';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const booking = useLoaderData();
    const { treatment, slot, price, appointmentDate } = booking;

    return (
        <div className='mt-9'>
            <h1 className='text-3xl font-semibold text-gray-600'>Payment for <span className='text-amber-600 font-serif font-bold'>{treatment}</span></h1>
            <h3 className='mt-3 text-lg'>Please Pay <span className='text-amber-600 font-serif font-bold'>${price}</span> for your appointment on <span className='font-medium italic'>{appointmentDate}</span> at <span className='font-medium italic'>{slot}</span></h3>
            <div className='w-[40%] my-11 border-2 rounded-lg py-3 px-4'>
                <Elements stripe={stripePromise}>
                    <CheckOut booking={booking} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;