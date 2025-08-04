import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFoundPage from './pages/NotFoundPage';
import NoInternet from './pages/NoInternet';

import Cart from './components/Cart';
import MyOrder from './components/MyOrder';
import CreateProduct from './components/CreateProduct';
import SellerDashboard from './components/sellerDashboard';
import TrackMyOrder from './components/TrackMyOrder'
import TrackSellerOrder from './components/TrackSellerOrder';
import AdminDashboard from './components/AdminDashboard';
import NetworkWatcher from './components/NetworkWatcher';
import UserProfile from './components/userProfile';
import NewOrder from './components/newOrder';
import MyProducts from './components/MyProducts';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className='Container'>
      <NetworkWatcher/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<UserProfile />} />
        {/* <Route path="/cart" element={<Cart/>} />
        <Route path="/MyOrder" element={<MyOrder/>} />
        <Route path="/trackOrder/:id" element={<TrackMyOrder />} /> */}
        
        {/* <Route path="/sellerDashboard" element={<SellerDashboard />}>
          <Route index element={<NewOrder/>} />             
          <Route path='newOrder' element={<NewOrder/>} />
          <Route path='myProducts' element={<MyProducts/>} />
          <Route path="createProduct" element={<CreateProduct/>} />
        </Route> */}
        <Route path="/TrackSellerOrder/:id" element={<TrackSellerOrder/>} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/no-internet" element={<NoInternet />} />
        <Route path="*" element={<NotFoundPage/>} />

        {/* User-only routes */}
          <Route path="/cart" element={
            <ProtectedRoute allowedRoles={['User']}>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/MyOrder" element={
            <ProtectedRoute allowedRoles={['User']}>
              <MyOrder />
            </ProtectedRoute>
          } />
          <Route path="/trackOrder/:id" element={
            <ProtectedRoute allowedRoles={['User']}>
              <TrackMyOrder />
            </ProtectedRoute>
          } />
          
          <Route path="/sellerDashboard" element={
              <ProtectedRoute allowedRoles={['Seller']}>
                <SellerDashboard />
              </ProtectedRoute>}
          >
            <Route index element={<NewOrder/>} />             
            <Route path='newOrder' element={<NewOrder/>} />
            <Route path='myProducts' element={<MyProducts/>} />
          <Route path="createProduct" element={<CreateProduct/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

