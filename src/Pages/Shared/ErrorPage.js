import { Link, useRouteError } from 'react-router-dom';
import NotFound from '../../assets/images/404.png';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className='hero min-h-screen'>
      <div className='hero-overlay bg-opacity-60'></div>
      <div className='hero-content text-center text-neutral-content'>
        <div className='max-w-md'>
          <img src={NotFound} className='rounded-3xl' alt='NotFound' />
          <p className='my-6 text-lg'>
            Sorry, an unexpected error has occurred.
          </p>
          <i className='text-secondary text-lg font-semibold'>
            {error.statusText || error.message}
          </i>
          <br />
          <button className='btn bg-gradient-to-r from-accent to-secondary text-lg text-white capitalize w-full mt-6'>
            <Link to='/'>Back To Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

// img link: https://i.ibb.co/VtX5Rjw/404.png
