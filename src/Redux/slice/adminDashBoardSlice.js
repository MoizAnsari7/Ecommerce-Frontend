import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

export const fetchAllProducts = createAsyncThunk(
  'adminDashboard/fetchAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/itemGet');
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  'adminDashboard/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/getAllUsers');
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  'adminDashboard/fetchAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/getAllOrders');
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const adminDashboardReducer = createSlice({
  name: 'adminDashboard',
  initialState: {
    products: [],
    users : [],
    orders: [],
    status: 'idle',
    error: null
  },

  reducers: {},
  
  extraReducers: builder => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      //users
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Orders
      .addCase(fetchAllOrders.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export default adminDashboardReducer.reducer;
