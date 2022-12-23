import { Link } from 'react-router-dom';
import Wrong from '../../assets/images/something.jpg';

const PaymentFail = () => {
  return (
    <div className='text-danger text-center p-24 m-24 flex flex-col items-center gap-8 shadow-xl'>
      <img
        src={Wrong}
        className='rounded-3xl w-1/2'
        alt='something went wrong'
      />
      <Link to='/' className='btn bg-gradient-to-r from-accent to-secondary text-lg text-white  capitalize my-8'>Back to Home</Link>
    </div>
  );
};

export default PaymentFail;
