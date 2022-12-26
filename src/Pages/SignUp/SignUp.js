import React from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../api/auth';
import img from '../../assets/images/login/signup.jpg';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useTitle from '../../hooks/useTitle';

const SignUp = () => {
  useTitle('SignUp')
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate()
  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success('SignUp Successful')
        form.reset()
        setAuthToken(user)
        navigate('/')
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='hero w-full my-20'>
      <div className='hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row'>
        <div className='text-center lg:text-left'>
          <img className='rounded-3xl' src={img} alt='' />
        </div>
        <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20'>
          <h1 className='text-3xl text-center font-bold'>Sign Up</h1>
          <form onSubmit={handleSignUp} className='card-body'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Name</span>
              </label>
              <input
                type='text'
                name='name'
                placeholder='Your Name'
                className='input input-bordered'
              />
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='email'
                name='email'
                placeholder='email'
                className='input input-bordered'
                required
              />
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <input
                type='password'
                name='password'
                placeholder='password'
                className='input input-bordered'
                required
              />
            </div>
            <div className='form-control mt-6'>
              <input
                className='btn btn-secondary'
                type='submit'
                value='Sign Up'
              />
            </div>
          </form>
          <p className='text-center'>
            Already have an account?{' '}
            <Link className='text-green-600 font-bold' to='/login'>
              Login
            </Link>{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
