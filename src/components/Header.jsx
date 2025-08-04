import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { BiSolidUser } from "react-icons/bi";
import { AuthContext } from '../contex/AuthContex';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../Redux/slice/cartSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  
  const cartItems = useSelector((state) => state.cart.items);
  
  const {logout} = useContext(AuthContext);

  return (
    <header className="header">
      <div className="left">
        <Link to="/" className="logo">ClassicShop</Link>
      </div>

      <div className="center">
        <input type="text" placeholder="Search for items..." />
        <button>🔍</button>
      </div>

      <div className="right">
        { user ? 
          (
          <div className="user-menu">
            <div className="user-name">
              <BiSolidUser className="user-icon" />
              {user.name}
            </div>
            <div className="dropdown-menu">
              <div onClick={() => navigate('/user')}>👤 Profile</div>
              <div onClick={() => navigate('/MyOrder')}>📦 My Orders</div>
              <div onClick={()=>{
                logout();
                dispatch(clearCart());
              }}>🚪 Sign Out</div>
            </div>
          </div>
          ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
          )
        }
        <div className='cartContainer'>
          <Link to="/cart">🛒</Link>
          <div className='cartLength'>{cartItems.length}</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
