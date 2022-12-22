import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useTitle from '../../hooks/useTitle';

const Checkout = () => {
  useTitle('Checkout')
  const { _id, title, price } = useLoaderData();
  const { user } = useContext(AuthContext);

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || 'Unregistered';
    const phone = form.phone.value;
    const message = form.message.value;

    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      phone,
      message,
    };

    fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        // authorization: `Bearer ${localStorage.getItem('mechanic-token')}`
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success(`Your booking "${title}" is confirmed`);
          form.reset();
        }
      })
      .catch((er) => console.error(er));
  };

  return (
    <div className='m-12 p-12 shadow-2xl'>
      <form onSubmit={handlePlaceOrder}>
        <h2 className='text-3xl font-bold'>
          You are about to order:{' '}
          <span className='text-secondary ml-2'>{title}</span>
        </h2>
        <h4 className='text-2xl my-3 ml-4 text-secondary'>Price: ${price}</h4>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <input
            name='firstName'
            type='text'
            placeholder='First Name'
            className='input input-ghost w-full  input-bordered'
          />
          <input
            name='lastName'
            type='text'
            placeholder='Last Name'
            className='input input-ghost w-full  input-bordered'
          />
          <input
            name='phone'
            type='text'
            placeholder='Your Phone'
            className='input input-ghost w-full  input-bordered'
            required
          />
          <input
            name='email'
            type='text'
            placeholder='Your email'
            defaultValue={user?.email}
            className='input input-ghost w-full  input-bordered'
            readOnly
          />
        </div>
        <textarea
          name='message'
          className='textarea textarea-bordered h-24 w-full my-5'
          placeholder='Type here your message'
          required
        ></textarea>

        <input
          className='btn btn-secondary'
          type='submit'
          value='Place Your Order'
        />
      </form>
    </div>
  );
};

export default Checkout;
