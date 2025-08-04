import './TrackMyOrder.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { cancelUserOrder, trackUserOrder } from '../Redux/slice/TrackMyOrderSlice';

const orderSteps = [
  "Pending",
  "Confirmed",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled"
];

function TrackMyOrder(){
  const dispatch = useDispatch();
  const { id } = useParams();
  const order = useSelector(state => state.trackmyOrder.userOrder);
  const error = useSelector(state => state.trackmyOrder.userOrderError);
  const [showModal, setShowModal] = useState(false);

  async function cancelOrderHandler() {
    try {
      await dispatch(cancelUserOrder(id)).unwrap();
      toast.success("Order cancelled successfully");
      setShowModal(false);
    } 
    catch (err) {
      console.error(err);
      toast.error("Failed to cancel order");
    }
  }
  
  async function fetchOrder() {
    try{
      await dispatch(trackUserOrder(id)).unwrap();
    }
    catch(error){
      toast.error(error);
    }
  }

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 1000); // refresh every sec
    return () => clearInterval(interval);
  }, [id]);

  if (error) return <div className="track-container"><h2>{error}</h2></div>;
  if (!order) return <div className="track-container"><h2>Loading...</h2></div>;

  const currentStepIndex = orderSteps.indexOf(order.order_status);
  const canCancel = !["Delivered", "Cancelled"].includes(order.order_status);

  return (
    <div className="track-container">
      <h2>📦 Tracking Order</h2>
      <p><strong>Order ID:</strong> {order.order_id}</p>
      <p><strong>Last Updated:</strong> {new Date(order.changeAt).toLocaleString()}</p>

      <div className="timeline">
        {orderSteps.map((step, index) => {
          const statusClass = 
            index < currentStepIndex ? 'done' : 
            index === currentStepIndex ? 'current' : 'upcoming';

          return (
            <div key={step} className={`step ${statusClass}`}>
              <div className="dot"></div>
              <div className="label">{step}</div>
            </div>
          );
        })}
      </div>

      {canCancel && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button className="cancel-btn" onClick={() => setShowModal(true)}>
            ❌ Cancel Order
          </button>
        </div>
      )}

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Cancel Order?</h3>
            <p>This action cannot be undone. Are you sure?</p>
            <div className="modal-buttons">
              <button className="modal-confirm" onClick={cancelOrderHandler}>Yes</button>
              <button className="modal-cancel" onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackMyOrder;
