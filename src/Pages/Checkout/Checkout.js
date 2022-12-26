import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useTitle from '../../hooks/useTitle';

const Checkout = () => {
  useTitle('Checkout');
  const { _id, title, price, img } = useLoaderData();
  const { user } = useContext(AuthContext);

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || 'Unregistered';
    const phone = form.phone.value;
    const address = form.address.value;
    const postcode = form.postcode.value;
    const currency = form.currency.value;

    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      phone,
      address,
      postcode,
      currency,
    };

    fetch(`${process.env.REACT_APP_ApiUrl}/orders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('mechanic-token')}`,
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // if (data.acknowledged) {
        //   toast.success(`Your booking "${title}" is confirmed`);
        //   form.reset();
        // }
        window.location.replace(data.url);
      })
      .catch((er) => console.error(er));
  };

  return (
    <div className='p-8 m-8 my-12 shadow-2xl'>
      <form
        onSubmit={handlePlaceOrder}
        className='grid gap-6 grid-cols-1 md:grid-cols-2'
      >
        <div>
          <h2 className='text-2xl font-bold'>
            Your Booking: <span className='text-secondary ml-2'>{title}</span>
          </h2>
          <h4 className='text-xl my-3 ml-4 font-bold'>
            Service charge:{' '}
            <span className='text-secondary ml-2'>${price}</span>
          </h4>
          <img src={img} className='w-fit rounded-3xl' alt='ServiceImage' />
        </div>

        <div>
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
            />
            <input
              name='email'
              type='text'
              placeholder='Your email'
              defaultValue={user?.email}
              className='input input-ghost w-full  input-bordered'
              readOnly
            />
            <select
              defaultValue='BDT'
              name='currency'
              className='select select-bordered max-w-xs'
            >
              <option value='BDT'>BDT</option>
              <option value='USD'>USD</option>
            </select>

            <input
              type='text'
              name='postcode'
              placeholder='Your Postcode'
              className='input input-ghost w-full  input-bordered'
            />
          </div>

          <textarea
            name='address'
            className='textarea textarea-bordered h-24 w-full my-5'
            placeholder='Your Address'
          ></textarea>

          <input
            type='submit'
            value='Pay Online'
            className='btn bg-gradient-to-r from-accent to-secondary text-lg text-white capitalize w-full'
          />
        </div>
      </form>
    </div>
  );
};

export default Checkout;
