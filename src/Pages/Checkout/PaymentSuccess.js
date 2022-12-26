import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const PaymentSuccess = () => {
  const { user } = useContext(AuthContext);

  const location = useLocation();
  console.log(location.search);
  const query = new URLSearchParams(location.search);

  const transactionId = query.get('transactionId');

  const [order, setOrder] = useState({});

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_ApiUrl}/orders/by-transaction-id/${transactionId}`
    )
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, [transactionId]);
  console.log(order);

  if (!order?._id) {
    return <div className='m-12 p-12 text-center text-4xl text-secondary capitalize'>No order found</div>;
  }
  return (
    <div className='m-8 p-8 my-16'>
      <h2 className='text-center my-2 text-green-500 text-xl'>
        Congrats! booking payment successful.
      </h2>

      <h2 className='text-center my-5 text-2xl font-bold'>
        Your Order Summary
      </h2>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>

              <th>Booking Name</th>
              <th>Price</th>
              <th>Address</th>
              <th>transaction Id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{user?.displayName}</td>

              <td>{order.serviceName}</td>
              <td>{order.price}</td>
              <td>{order.address}</td>
              <td>{transactionId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='text-center items-center shadow-lg my-24'>
        <p
          className='btn bg-gradient-to-r from-accent to-secondary text-lg text-white  capitalize  print:hidden'
          onClick={() => window.print()}
        >
          Print your payment history
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
