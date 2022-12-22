import React, { useContext } from 'react';
import { setAuthToken } from '../../../api/auth';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        setAuthToken(user);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className='flex justify-center'>
      
      <p className='text-center'>
        <button onClick={handleGoogleSignIn} className='btn btn-primary capitalize hover:bg-blue-600 hover:text-white mb-2 w-full gap-4'>
          Continue with Google
          <FcGoogle />
        </button>

      </p>
    </div>
  );
};

export default SocialLogin;
// 69-5_2 