import { useEffect } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { checkOutHandler, fetchCart, removeCartItem, updateQtyMinus, updateQtyPlus } from '../Redux/slice/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const cartStatus = useSelector(state => state.cart.status);

  const user = JSON.parse(localStorage.getItem("user"));

  let totalAmount = cartItems.reduce((total , item)=>
    total + item.item_subtotal, 0
  )

  async function removeFromCart(item_id){
    try{
      await dispatch(removeCartItem(item_id)).unwrap();
      console.log("BB")
      toast.success("Item removed from cart");
    }
    catch(error){
      console.error(error);
      toast.error(error);
    }
  } 
  async function checkOut(){
    try{
      await dispatch(checkOutHandler()).unwrap();
      toast.success("order placed successful");
      navigate("/MyOrder");
    }
    catch(error){
      console.log(error);
      toast.error(error);
    }
  }

  async function getCartItem(){
    if(user){
      dispatch(fetchCart());
    }
  }

  useEffect(()=>{
    getCartItem();
  },[])

  if(cartStatus === 'loading') {
    return <p>Loading cart...</p>;
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? 
        (
          <p className="empty-cart">Your cart is empty</p>
        ) : 
        (
          cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.item_image} alt={item.item_name} />
              <div className="cart-item-details">
                <h3>{item.item_name}</h3>
                {
                  item.item_discount ? (
                  <div className="price">
                      <span className="discounted-price">
                          ${(item.item_price * (1 - parseFloat(item.item_discount) / 100)).toFixed(2)}
                      </span>
                      <span className="original-price">${item.item_price.toFixed(2)}</span>
                  </div>
                  ) : (
                  <div className="price">${item.item_price.toFixed(2)}</div>
                  )
                }
                <div className="quantity-container">
                  <div>Quantity: </div>
                  <button onClick={()=>{ dispatch(updateQtyMinus(item._id)) }} disabled={item.item_qty <= 1}>-</button>
                  <div className="quantity">{item.item_qty}</div>
                  <button onClick={()=>{ dispatch(updateQtyPlus(item._id)) }}>+</button>
                </div>
              </div>
              <button className='cart-item-button' onClick={()=>{removeFromCart(item._id)}}>Remove</button>
            </div>
          ))
        )
      }

      <div className='checkoutContainer'>
        <div>Total amount : ${totalAmount.toFixed(2)}</div>
        <button onClick={checkOut} disabled={cartItems.length === 0}>CheckOut</button>
      </div>
    </div>
  );
}

export default Cart;