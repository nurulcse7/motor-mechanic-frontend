import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useTitle from '../../hooks/useTitle';
import OrderRow from './OrderRow';

const Orders = () => {
  useTitle('Orders');
  const { user, logOut } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_ApiUrl}/orders?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('mechanic-token')}`,
      }, //69-6
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return logOut();
        }
        return res.json();
      })
      .then((data) => {
        setOrders(data);
      });
  }, [user?.email, logOut]);

  const handleDelete = (id) => {
    const proceed = window.confirm(
      'Are you sure, you want to cancel this order'
    );
    if (proceed) {
      fetch(`${process.env.REACT_APP_ApiUrl}/orders/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('mechanic-token')}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            toast.success('Your booking was deleted successfully');
            const remaining = orders.filter((odr) => odr._id !== id);
            setOrders(remaining);
          }
        });
    }
  };

  const handleStatusUpdate = (id) => {
    fetch(`${process.env.REACT_APP_ApiUrl}/orders/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('mechanic-token')}`,
      },
      body: JSON.stringify({ status: 'Approved' }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          const remaining = orders.filter((odr) => odr._id !== id);
          const approving = orders.find((odr) => odr._id === id);
          approving.status = 'Approved';

          const newOrders = [approving, ...remaining];
          setOrders(newOrders);
        }
      });
  };

  return (
    <div className='m-4 p-4 shadow-2xl mb-36'>
      <h2 className='text-3xl font-bold text-center my-8'>
        You have <span className='text-secondary'>{orders.length}</span> Orders
      </h2>
      <div className='overflow-x-auto w-full'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Booking Info</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderRow
                key={order._id}
                order={order}
                handleDelete={handleDelete}
                handleStatusUpdate={handleStatusUpdate}
              ></OrderRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
// 67-6, 7,
