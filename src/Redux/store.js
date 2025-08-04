import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slice/cartSlice';
// import signupReducer from './slice/signupSlice';
// import loginReducer from './slice/loginSlice';
import TrackSellerOrderReducer from './slice/TrackSellerOederSlice';
import TrackMyOrderReducer from './slice/TrackMyOrderSlice';
import sellerDashboardReducer from './slice/sellerDashboardSlice';
import myOrderReducer from './slice/myOrderSlice';
import adminDashbordReducer from './slice/adminDashBoardSlice';
import productReducer from "./slice/productSlice";
import networkReducer from "./slice/networkSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // signup: signupReducer,
    // login: loginReducer,
    sellerOrder : TrackSellerOrderReducer,
    trackmyOrder : TrackMyOrderReducer,
    sellerDashboard : sellerDashboardReducer,
    myOrder : myOrderReducer,
    adminDashbord : adminDashbordReducer,
    product  : productReducer,
    network: networkReducer,
  }
});