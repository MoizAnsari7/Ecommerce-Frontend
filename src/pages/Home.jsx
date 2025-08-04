import { useEffect } from 'react';
import './Home.css';
import Header from "../components/Header";
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../Redux/slice/cartSlice';
import { fetchProducts } from '../Redux/slice/productSlice';

function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.product);

  async function getData(){
    try{
      dispatch(fetchProducts());
      dispatch(fetchCart());
    }
    catch(error){
      console.log(error);
      toast.error("Failed to fetch items");
    }
  }

  useEffect(()=>{
    getData();
  },[]);

  return (
    <div>
      <Header />
      <div className="home-container">
        <h1>Welcome to eShop Central</h1>
        <p>Buy top-rated products at great prices!</p>

        <div className="products-grid">
          {
            products.map(item => (
              <ProductCard key={item._id} item={item} />
            ))
          }
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
