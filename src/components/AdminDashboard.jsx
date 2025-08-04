import { useEffect, useState } from 'react';
import './AdminDashboard.css';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders, fetchAllProducts, fetchAllUsers } from '../Redux/slice/adminDashBoardSlice';

function AdminDashboard() {
  const dispatch = useDispatch();
  const [view, setView] = useState('products');

  const {products, users , orders, status} = useSelector(state => state.adminDashbord)

  async function getDetails(){
    try{
      if (view === 'products') {
        dispatch(fetchAllProducts());
      } else if (view === 'users') {
        dispatch(fetchAllUsers());
      } else if (view === 'orders') {
        dispatch(fetchAllOrders());
      }
    }
    catch(error){
      toast.error(error);
    }
  }

  useEffect(() => {
    getDetails();
  }, [view]);

  return (
    <div className="admin-dashboard">
      <h1>Admin Panel</h1>
      <div className="admin-nav">
        <button onClick={() => setView('products')}>View All Products</button>
        <button onClick={() => setView('users')}>View All Users</button>
        <button onClick={() => setView('orders')}>View All Orders</button>
      </div>

      <div className="admin-content">
        {status === 'loading' && <p>Loading...</p>}
        {view === 'products' && (
          <div>
            <h2>All Products</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th><th>Category</th><th>Price</th><th>Discount</th><th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p =>(
                  <tr key={p._id}>
                    <td>{p.item_name}</td>
                    <td>{p.item_category}</td>
                    <td>{p.item_price}</td>
                    <td>{p.item_discount || 0}%</td>
                    <td>{p.item_qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === 'users' && (
          <div>
            <h2>All Users</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th><th>Email</th><th>Phone</th><th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === 'orders' && (
          <div>
            <h2>All Orders</h2>
            <table>
              <thead>
                <tr>
                  <th>Item</th><th>User ID</th><th>Seller ID</th><th>Qty</th><th>Total</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => {
                  console.log(o);
                return (
                  <tr key={o._id}>
                    <td>{o.item_name}</td>
                    <td>{o.user_id}</td>
                    <td>{o.seller_id}</td>
                    <td>{o.item_qty}</td>
                    <td>{o.item_subtotal.toFixed(2)}</td>
                    <td>{o.order_status}</td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
