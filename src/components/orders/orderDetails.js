import React from 'react';
import { useLocation } from 'react-router-dom';
import './OrderDetails.css'

const OrderDetails = () => {
  const location = useLocation();
  const { orderDetails } = location.state || {};

  if (!orderDetails) {
    return <div>No order details found.</div>;
  }

  return (
    <div className="order-details">
      <h1>Order Details</h1>
      <br></br>
      <p>Order ID: {orderDetails.receipt}</p>
      <p><b>Total Amount: Rs. {orderDetails.amount / 100}</b></p>
      <br></br>
      <h2>Items:</h2>
      <ul>
        {orderDetails.items.map((item) => (
          <li key={item.id}>
            {item.name} - Rs.{item.price} x {item.quantity} = {item.price * item.quantity}
          </li>
        ))}
      </ul>

      
      {/* <p>Currency: {orderDetails.currency}</p> */}
      
    </div>
  );
};

export default OrderDetails;