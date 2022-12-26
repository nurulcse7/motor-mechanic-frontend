import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.jpg';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useTitle from '../../hooks/useTitle';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Login = () => {
  useTitle('Login');
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then((result) => {
        const user = result.user;

        const currentUser = {
          email: user.email,
        };

        console.log(currentUser);
        navigate(from, { replace: true });
        // get jwt token
        fetch(`${process.env.REACT_APP_ApiUrl}/jwt`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            // local storage is the easiest but not the best place to store jwt token 69-5
            localStorage.setItem('mechanic-token', data.token);
            navigate(from, { replace: true });
          });
      })
      // .catch((error) => console.log(error));
  };

  return (
    <div className='hero w-full my-10 p-8'>
      <div className='hero-content grid gap-8 md:grid-cols-2 flex-col lg:flex-row'>
        <div className='text-center lg:text-left'>
          <img className='w-3/4 rounded-3xl' src={img} alt='' />
        </div>
        <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20'>
          <h1 className='text-3xl text-center font-bold'>Login</h1>
          <form onSubmit={handleLogin} className='card-body'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='email'
                name='email'
                placeholder='email'
                className='input input-bordered'
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
              />
              <label className='label'>
                <Link to='' className='label-text-alt link link-hover'>
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className='form-control mt-6'>
              <input
                className='btn btn-secondary'
                type='submit'
                value='Login'
              />
            </div>
          </form>
          <p className='text-center'>
            New to Motor Mechanic?{' '}
            <Link className='text-green-600 font-bold' to='/signup'>
              Sign Up
            </Link>{' '}
          </p>
          <div className='divider'>OR</div>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
