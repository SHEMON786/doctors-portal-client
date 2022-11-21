import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddDoctors = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();

    const imgHostKey = process.env.REACT_APP_imgbb_apiKey;

    const { data: specialty = [], isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:7007/specialty`)
            const data = await res.json()
            return data;
        }
    })

    const handleAddDoctor = data => {
        // console.log(data.img[0]);
        const img = data.img[0];
        const formData = new FormData();
        formData.append('image', img);
        fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData?.success) {
                    // console.log(imgData.data.display_url);
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        img: imgData.data.display_url,
                        specialty: data.specialty
                    }
                    fetch(`http://localhost:7007/addDoctors`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success(`${doctor?.name} added successfully`);
                                navigate('/dashboard/manage-doctors');
                            }
                        })
                        .catch(err => toast.error(err.message))
                }
            })
            .catch(err => toast.error(err.message))
    }

    if (isLoading) {
        return <div className='flex justify-center h-7 w-7 border-8 animate-spin rounded-full bg-lime-700'></div>
    }

    return (
        <div className='w-96 shadow-lg rounded-2xl p-7 ml-3'>
            <h1 className="text-3xl font-bold mb-7 text-center">Add a Doctor</h1>

            <form onSubmit={handleSubmit(handleAddDoctor)}>
                <div className="form-control mb-2 w-full max-w-xs">
                    <label className="label"><span className="label-text">Your Name</span></label>
                    <input type="text" placeholder='Type your name here'
                        {...register("name", {
                            required: 'Please Provide Your Name'
                        })}
                        aria-invalid={errors?.name ? 'true' : 'false'}
                        className="input input-bordered w-full" />
                    {errors?.name && <p role='alert' className='text-red-600'>{errors?.name?.message}</p>}
                </div>
                <div className="form-control mb-2 w-full max-w-xs">
                    <label className="label"><span className="label-text">Email Address</span></label>
                    <input type="email" placeholder='example@email.com'
                        {...register("email", {
                            required: true
                        })}
                        aria-invalid={errors?.email ? 'true' : 'false'}
                        className="input input-bordered w-full" />
                    {errors?.email && <p role='alert' className='text-red-600'>Email Address is required</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Specialty</span></label>
                    <select
                        {...register("specialty", {
                            required: 'Please Provide Your Specialty'
                        })}
                        aria-invalid={errors?.specialty ? 'true' : 'false'}
                        className="select select-bordered w-full max-w-xs">
                        <option disabled value='' selected>Please Select a Specialty</option>
                        {
                            specialty.map(s => <option
                                key={s._id}
                                value={s.name}
                            >{s.name}</option>)
                        }
                    </select>
                    {errors?.specialty && <p role='alert' className='text-red-600'>{errors?.specialty?.message}</p>}
                </div>
                <div className="form-control mb-2 w-full max-w-xs">
                    <label className="label"><span className="label-text">Your Photo</span></label>
                    <input type="file"
                        {...register("img", {
                            required: 'Please Provide Your Photo'
                        })}
                        aria-invalid={errors?.img ? 'true' : 'false'}
                    />
                    {errors?.img && <p role='alert' className='text-red-600'>{errors?.img?.message}</p>}
                </div>
                <input type="submit" value='Add Doctor' className='max-w-xs btn btn-accent w-full rounded-lg text-white py-3 mt-7' />
            </form>
        </div>
    );
};

export default AddDoctors;