import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useTitle from '../../../hooks/useTitle';
import ServiceCard from './ServiceCard';

const Services = () => {
  useTitle('Services')
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/services')
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div>
      <div className='text-center mb-4 shadow-2xl'>
        <p className='text-2xl font-bold text-green-600'>Services</p>
        <h2 className='text-4xl font-semibold'>Our Service Area</h2>
        <p className='m-2 p-4'>
          Use a calendar to schedule the dates you’ll want to share each topic.
          Consider the seasons and holidays, and set a regular schedule that
          works for you. We like to send newsletters on behalf of our clients
          twice a month.
        </p>
      </div>
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {services.map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default Services;
