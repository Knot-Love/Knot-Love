import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import NoData from '../components/NoData';

const API = import.meta.env.VITE_API_URL;

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const userOrders = useSelector(state => state.orders.order); // original redux data

  useEffect(() => {
    setOrders(userOrders); // sync on mount
  }, [userOrders]);

  const handleCancel = async (orderId) => {
    try {
      const res = await axios.delete(`${API}/api/order/orders/${orderId}`, {
        withCredentials: true,
      });
      console.log("Order cancelled:", res.data.message);
      // Remove the deleted order from local state
      setOrders(prev => prev.filter(order => order._id !== orderId));
    } catch (err) {
      console.error("Cancel order error:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Failed to cancel order");
    }
  };

  return (
    <div>
      <div className='bg-white shadow-md p-3 font-semibold'>
        <h1>Order</h1>
      </div>

      {!orders.length && <NoData />}

      {orders.map((order, index) => (
        <div key={order._id + index + "order"} className='order rounded p-4 text-sm'>
          <p>Order No : {order?.orderId}</p>
          <div className='flex gap-3 items-center justify-between'>
            <div className='flex gap-3'>
              <img src={order.product_details.image[0]} className='w-14 h-14' />
              <p className='font-medium'>{order.product_details.name}</p>
            </div>
            <button
              className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
              onClick={() => handleCancel(order._id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
