import React, { useState } from 'react';
import { format } from 'date-fns';
import AppointmentOption from './AppointmentOption';
import BookingModal from '../BookingModal/BookingModal';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';


const AvailableAppointments = ({ selectedDate }) => {
    const [treatment, setTreatment] = useState(null);
    const date = format(selectedDate, 'PPP');

    const { data: appointmentOptions = [], refetch, isLoading } = useQuery({
        queryKey: ['appointmentOptions', date],
        queryFn: async () => {
            const res = await fetch(`http://localhost:7007/appointmentOptions?date=${date}`)
            const data = res.json();
            // console.log(data);
            return data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section className='my-24'>
            <p
                className='text-secondary text-[22px] text-center font-semibold'
            >
                Available Appointments on {format(selectedDate, 'PPP')}
            </p>
            <div className='mt-20 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:w-[85%] lg:mx-auto'>
                {
                    appointmentOptions.map(appointmentOption => <AppointmentOption
                        key={appointmentOption._id}
                        appointmentOption={appointmentOption}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>
            {
                treatment && <BookingModal
                    treatment={treatment}
                    setTreatment={setTreatment}
                    selectedDate={selectedDate}
                    refetch={refetch}
                ></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointments;