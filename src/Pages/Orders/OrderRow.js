import React, { useEffect, useState } from 'react';

const OrderRow = ({ order, handleDelete, handleStatusUpdate }) => {
  const { _id, serviceName, phone, customer, email, price, service, status } =
    order;
  const [orderService, setOrderService] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_ApiUrl}/services/${service}`)
      .then((res) => res.json())
      .then((data) => setOrderService(data));
  }, [service]);

  return (
    <tr>
      <th>01</th>
      <td>
        <div className='flex items-center space-x-3'>
          <div className='avatar'>
            <div className='rounded w-24 h-24'>
              {orderService?.img && (
                <img src={orderService.img} alt='ServicePhoto' />
              )}
            </div>
          </div>
          <div>
            <div className='font-bold'>{customer}</div>
            <div className='text-sm opacity-50'>{phone}</div>
          </div>
        </div>
      </td>
      <td>
        {serviceName}
        <br />
        <span className='badge badge-ghost badge-sm'>${price}</span>
      </td>
      <td>{email} </td>
      <th>
        <button
          onClick={() => handleStatusUpdate(_id)}
          className='btn btn-secondary btn-xs'
        >
          {status ? status : 'pending'}
        </button>
      </th>
      <th>
        <label>
          <button onClick={() => handleDelete(_id)} className='btn btn-error'>
            X
          </button>
        </label>
      </th>
    </tr>
  );
};

export default OrderRow;
// 67-6, 7, 8
