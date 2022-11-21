import React, { useContext } from 'react';
import { format } from 'date-fns';
import { AuthContext } from '../../../Context/AuthProvider';
import { toast } from 'react-toastify';

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
    const { name, slots, price } = treatment;
    const { user } = useContext(AuthContext);
    const date = format(selectedDate, 'PPP');

    const handleBooking = e => {
        e.preventDefault();
        const form = e.target;
        const userName = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const slot = form.slot.value;

        const booking = {
            patient: userName,
            email,
            phone,
            slot,
            price,
            treatment: name,
            appointmentDate: date

        }

        fetch(`http://localhost:7007/bookings`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success('Data Inserted Successfully');
                    refetch();
                }
                else {
                    toast.error(data.message);
                }
            })
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-xl font-bold">{name}</h3>
                    <form onSubmit={handleBooking} className='mt-11'>
                        <input type="text" value={date} disabled className="input input-bordered mb-5 w-full" />
                        <select name='slot' className="select select-bordered w-full mb-5">
                            {slots.map((slot, idx) => <option key={idx} value={slot}>{slot}</option>)}
                        </select>
                        <input name='name' defaultValue={user?.displayName} disabled type="text" placeholder="Your Name" className="input input-bordered mb-5 w-full" />
                        <input name='email' defaultValue={user?.email} disabled type="email" placeholder="Email Address" className="input input-bordered mb-5 w-full" />
                        <input name='phone' type="text" placeholder="Phone Number" className="input input-bordered mb-8 w-full" />
                        <input type="submit" value="Submit" className='btn btn-accent w-full' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;