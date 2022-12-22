import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  const { _id, img, price, title } = service;
  return (
    <div className='card card-compact w-96 bg-base-100 shadow-xl'>
      <figure>
        <img src={img} alt='Services' />
      </figure>
      <div className='card-body flex-row justify-evenly'>
        <div>
          <h2 className='card-title'>{title}</h2>
          <p className=' text-green-600 font-semibold'>Price: ${price}</p>
        </div>
        <div className='card-actions justify-end'>
          <Link to={`/checkout/${_id}`}>
            <button className='btn btn-secondary'>Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
