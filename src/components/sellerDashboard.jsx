import { NavLink, Outlet } from 'react-router-dom';
import './SellerDashboard.css';
import { useContext } from 'react';
import { AuthContext } from '../contex/AuthContex';

const SellerDashboard = () => {

  const { logout } = useContext(AuthContext)
  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h2>Dashboard</h2>
        <ul>
          <li>
            <NavLink to="myProducts">My Products</NavLink>
          </li>
          <li>
            <NavLink to="newOrder">New Orders</NavLink>
          </li>
          <li>
            <NavLink to="createProduct" >Add new Product</NavLink>
          </li>
        </ul>
        <div className="bottom-links">
          <NavLink to="/user" className="profile-link">
            🙍‍♂️ My Profile
          </NavLink>
            <button onClick={logout} className="logout-button">
              🔒 Logout
            </button>
        </div>
      </nav>

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default SellerDashboard;
