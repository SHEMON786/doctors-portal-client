import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../Hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const googleProvider = new GoogleAuthProvider();
    const handleLoginWithGoogle = () => {
        googleSignIn(googleProvider)
            .then(result => {
                console.log(result.user);
                toast.success("Login Successful With Google");
                navigate(from, { replace: true });
            })
    }

    const handleLogin = data => {
        console.log(data);

        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserEmail(data.email);
                toast.success('Login Successful');
            })
            .catch(error => toast.error(error.message))
    }

    return (
        <section className='h-[600px] flex justify-center items-center'>
            <div className='w-96 shadow-lg rounded-2xl p-7'>
                <h2 className='text-xl text-center mb-8'>Login</h2>

                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control mb-2 w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="email"
                            {...register("email", {
                                required: true
                            })}
                            aria-invalid={errors?.email ? 'true' : 'false'}
                            className="input input-bordered w-full" />
                        {errors?.email && <p role='alert' className='text-red-600'>Email Address id required</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password"
                            {...register("password", {
                                required: 'Please give your password',
                                minLength: { value: 6, message: 'Password must be 6 characters or more' }
                            })}
                            aria-invalid={errors?.password ? 'true' : 'false'}
                            className="input input-bordered w-full" placeholder='********' />
                        <label className="label"><span className="label-text text-xs hover:underline">Forget Password?</span></label>
                        {errors?.password && <p role='alert' className='text-red-600'>{errors?.password?.message}</p>}
                    </div>
                    <input type="submit" value='Login' className='btn btn-accent w-full rounded-lg text-white py-3 mt-7' />
                </form>

                <p className='text-sm text-center mt-[10px]'>New to Doctors Portal? <Link to='/signup' className='text-secondary'>Create new account</Link></p>
                <div className="divider">OR</div>
                <button onClick={handleLoginWithGoogle} className="btn btn-outline w-full mt-2">Continue With Google</button>
            </div>
        </section>
    );
};

export default Login;