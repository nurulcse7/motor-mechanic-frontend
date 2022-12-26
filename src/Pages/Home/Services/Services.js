import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../../../hooks/useTitle';
import ServiceCard from './ServiceCard';

const Services = () => {
  useTitle('Services');
  const [services, setServices] = useState([]);
  const [isAsc, setIsAsc] = useState(true);
  const [search, setSearch] = useState('');
  const searchRef = useRef();
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_ApiUrl}/services?search=${search}&order=${
        isAsc ? 'asc' : 'desc'
      }`
    )
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, [isAsc, search]);

  const handleSearch = () => {
    setSearch(searchRef.current.value);
  };
  return (
    <div>
      <div className='text-center mb-4 shadow-2xl'>
        <p className='text-2xl font-bold text-green-600'>Services</p>
        <h2 className='text-4xl font-semibold'>Our Service Area</h2>
        <p className='m-5 pl-12 pr-12 text-lg'>
          Use a calendar to schedule the dates you’ll want to share each topic.
          Consider the seasons and holidays, and set a regular schedule that
          works for you. We like to send newsletters on behalf of our clients
          twice a month.
        </p>
        <div className='p-4 flex justify-end '>
          <input
            ref={searchRef}
            type='text'
            placeholder='Type here'
            className='input input-bordered input-primary w-1/4 max-w-xs'
          />
          <button
            className='btn btn-primary mr-5 capitalize text-lg'
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className='btn btn-secondary tooltip tooltip-top capitalize text-lg'
            onClick={() => setIsAsc(!isAsc)}
            data-tip='High/Low Price Toggle'
          >
            {isAsc ? 'desc' : 'asc'}
          </button>
          <Link 
             to='/' 
             className='btn btn-primary ml-2 mr-2 capitalize text-lg '
             title='See All Services'
             >Refresh</Link>
        </div>
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
