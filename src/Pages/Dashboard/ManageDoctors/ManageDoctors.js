import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const ManageDoctors = () => {
    const [deleteDoctor, setDeleteDoctor] = useState(null);

    const closeModal = () => {
        setDeleteDoctor(null);
    }

    const { data: doctors = [], refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:7007/manageDoctors`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const data = await res.json()
                return data;
            } catch (error) {
                console.log(error);
            }
        }
    })

    const handleDeleteDoctor = doctor => {
        fetch(`http://localhost:7007/deleteDoctor/${doctor?._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success(`Doctor ${doctor?.name} deleted successfully`);
                    refetch();
                }
            })
            .catch(err => toast.error(err.message))
    }

    return (
        <div className='mt-10'>
            <h1 className="text-3xl font-bold mb-7">Manage Doctors: {doctors?.length}</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors?.map((doctor, i) => <tr key={doctor?._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-16 rounded-full">
                                            <img src={doctor?.img} alt='' />
                                        </div>
                                    </div>
                                </td>
                                <td>{doctor?.name}</td>
                                <td>{doctor?.email}</td>
                                <td>{doctor?.specialty}</td>
                                <td>
                                    <label
                                        onClick={() => setDeleteDoctor(doctor)}
                                        htmlFor="confirmation-modal"
                                        className="btn btn-sm btn-error"
                                    >Delete</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deleteDoctor && <ConfirmationModal
                    title={`Are you sure, You want to delete?`}
                    message={`If you delete ${deleteDoctor?.name}, it can not be recovered.`}
                    modalData={deleteDoctor}
                    successAction={handleDeleteDoctor}
                    successButtonName='delete'
                    closeModal={closeModal}
                >
                </ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;