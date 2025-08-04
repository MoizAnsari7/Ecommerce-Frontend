// src/Redux/slice/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

export const fetchMyOrders = createAsyncThunk(
  'myOrder/fetchMyOrders',
  async ( _, { rejectWithValue }) => {
    try {
      const res = await api.get("/getMyOrder")
      const sortedOrders = res.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      return sortedOrders;
    } 
    catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const myOrderReducer = createSlice({
  name: 'myOrder',
  initialState: {
    orders: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export default myOrderReducer.reducer;
