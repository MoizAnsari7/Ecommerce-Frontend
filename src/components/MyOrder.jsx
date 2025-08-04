import React, { useEffect, useState } from 'react';
import './MyOrder.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../Redux/slice/myOrderSlice';

function MyOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {orders} = useSelector(state => state.myOrder)

  const fetchOrders = async () => {
    try {
      await dispatch(fetchMyOrders()).unwrap();
    }
    catch (error) {
      console.error(error);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  
  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="order-list-header">
          <span>Item</span>
          <span>Qty</span>
          <span>Price</span>
          <span>Discount</span>
          <span>Subtotal</span>
          <span>Action</span>
        </div>
      )}

      {orders.map(order => (
        <div key={order._id} className="order-row">
          <div className="item-info">
            <img src={order.item_image} alt={order.item_name} />
            <div>
              <strong>{order.item_name}</strong>
              <div className="item-desc">{order.item_dsc}</div>
              <div className="item-category">{order.item_category}</div>
            </div>
          </div>
          <div>{order.item_qty}</div>
          <div>${parseFloat(order.item_price).toFixed(2)}</div>
          <div>{order.item_discount || '—'}%</div>
          <div>${parseFloat(order.item_subtotal).toFixed(2)}</div>
          <div>
            <button 
              className="cancel-btn" 
              onClick={() =>{ navigate(`/trackOrder/${order._id}`)}}
            >
              Track My Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyOrder;
