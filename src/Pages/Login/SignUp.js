import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../Hooks/useToken';

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUser, googleSignIn } = useContext(AuthContext);

    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();

    if (token) {
        navigate('/');
    }

    const googleProvider = new GoogleAuthProvider();
    const handleLoginWithGoogle = () => {
        googleSignIn(googleProvider)
            .then(result => {
                console.log(result.user);
                toast.success("Login Successful With Google");
                navigate('/');
            })
    }

    const handleSignup = data => {
        console.log(data);

        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                toast.success('Successfully Created Your Account');

                const userInfo = {
                    displayName: data?.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUserData(user?.displayName, user?.email)
                    })
                    .catch(error => {
                        toast.error(error.message)
                    })
            })
            .catch(error => toast.error(error.message))
    }

    const saveUserData = (name, email) => {
        const user = { name, email };
        fetch(`http://localhost:7007/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email);
            })
    }


    return (
        <section className='h-[700px] flex justify-center items-center'>
            <div className='w-96 shadow-lg rounded-2xl p-7'>
                <h2 className='text-xl text-center mb-8'>Sign Up</h2>

                <form onSubmit={handleSubmit(handleSignup)}>
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
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password"
                            {...register("password", {
                                required: 'Please Provide a Password',
                                minLength: { value: 6, message: 'Password must be 6 characters or more' },
                                pattern: { value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹])/, message: 'Password must be Strong' }
                            })}
                            aria-invalid={errors?.password ? 'true' : 'false'}
                            className="input input-bordered w-full" placeholder='********' />
                        {errors?.password && <p role='alert' className='text-red-600'>{errors?.password?.message}</p>}
                    </div>
                    <input type="submit" value='Sign Up' className='btn btn-accent w-full rounded-lg text-white py-3 mt-7' />
                </form>

                <p className='text-sm text-center mt-[10px]'>Already have an account? <Link to='/login' className='text-secondary'>Please Login</Link></p>
                <div className="divider">OR</div>
                <button onClick={handleLoginWithGoogle} className="btn btn-outline w-full mt-2">Continue With Google</button>
            </div>
        </section>
    );
};

export default SignUp;