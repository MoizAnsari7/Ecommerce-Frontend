import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TrackSellerOrder.css';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderDetails, updateOrderStatus } from '../Redux/slice/TrackSellerOederSlice';

const orderSteps = [
  "Pending",
  "Confirmed",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled"
];

const TrackSellerOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {orderTrack, orderDetail} = useSelector(state => state.sellerOrder)
  const [selectedStatus, setSelectedStatus] = useState("");

  function fetchOrder(){
    dispatch(fetchOrderDetails(id));
  };

  const handleStatusChange = async () => {
    if (!selectedStatus) {
      toast.error("Please select a status");
      return;
    }

    try {
      await dispatch(updateOrderStatus({ id, status: selectedStatus })).unwrap();
      toast.success("Order status updated");
      setSelectedStatus("");
      fetchOrder();
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 1000); // refresh every sec
    return () => clearInterval(interval);
  }, [id]);

  if (!orderTrack || !orderDetail) {
    return <div className="order-details-container">Loading...</div>;
  }

  const currentStepIndex = orderSteps.indexOf(orderTrack.order_status);

  return (
    <div className="order-details-container">
      <h2>Order Details</h2>
      <div className="order-card">
        <img src={orderDetail.item_image} alt={orderDetail.item_name} />
        <div className="order-info">
          <p><strong>👤 Buyer:</strong> {orderTrack.changeBy.name}</p>
          <p><strong>📦 Product:</strong> {orderDetail.item_name}</p>
          <p><strong>🏷️ Category:</strong> {orderDetail.item_category}</p>
          <p><strong>📝 Description:</strong> {orderDetail.item_dsc}</p>
          <p><strong>📅 Order Date:</strong> {new Date(orderTrack.changeAt).toLocaleString()}</p>
          <p><strong>🔢 Quantity:</strong> {orderDetail.item_qty}</p>
          <p><strong>💰 Price:</strong> ${parseFloat(orderDetail.item_price).toFixed(2)}</p>
          <p><strong>🏷️ Discount:</strong> {orderDetail.item_discount || 0}%</p>
          <p><strong>🧾 Subtotal:</strong> ${parseFloat(orderDetail.item_subtotal).toFixed(2)}</p>
          <p><strong>📦 Current Status:</strong> {orderTrack.order_status}</p>
          { 
            orderTrack.order_status === "Cancelled" &&
            <p className='cancelledBy'><strong>🧑 Cancelled By:</strong> {orderTrack.changeBy?.name || 'System'}</p>  
          }
        </div>

        <div className="status-timeline">
          {orderSteps.map((step, index) => {
            const className =
              index < currentStepIndex
              ? "step done"
              : index === currentStepIndex
              ? "step current"
              : "step upcoming";

            return (
              <div key={step} className={className}>
                <div className="dott" />
                <span>{step}</span>
              </div>
            );
          })}
        </div>

        { orderTrack.order_status !== "Cancelled" &&
          <div className="status-dropdown">
              <label><strong>Update Status:</strong></label>
              <select onChange={(e) => setSelectedStatus(e.target.value)}>
                      <option value="">-- Select Status --</option>
                      <option key="Confirmed" value="Confirmed">Confirmed</option>
                      <option key="Packed" value="Packed">Packed</option>
                      <option key="Shipped" value="Shipped">Shipped</option>
                      <option key="Cancelled" value="Cancelled">Cancelled</option>
              </select>
              <button className="update-btn" onClick={handleStatusChange}>
                  Update Status
              </button>
          </div>
        }
        <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
      </div>
    </div>
  );
};

export default TrackSellerOrder;
