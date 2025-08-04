import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { fetchSellerProducts } from '../Redux/slice/sellerDashboardSlice';
import './myProducts.css';

const MyProducts = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.sellerDashboard);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await dispatch(fetchSellerProducts()).unwrap();
      } catch (err) {
        console.error('Error fetching products:', err);
        toast.error('Failed to load your products');
      }
    };

    loadProducts();
  }, [dispatch]);

  return (
    <div className="products-container">
      <h2>🛒 My Products for Sale</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>You haven’t uploaded any products yet.</p>
      ) : (
        <>
          <div className="product-list-header">
            <span>Image</span>
            <span>Name</span>
            <span>Price</span>
            <span>Category</span>
            <span>Qty</span>
            <span>Discount</span>
          </div>

          {products.map(product => (
            <div className="product-row" key={product._id}>
              <div>
                <img src={product.item_image} alt={product.item_name} className="product-thumb" />
              </div>
              <div>{product.item_name}</div>
              <div>$ {product.item_price}</div>
              <div>{product.item_category}</div>
              <div>{product.item_qty}</div>
              <div>{product.item_discount || '-'}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default MyProducts;
