// src/Redux/slice/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

export const fetchOrderDetails = createAsyncThunk(
  'order/fetchOrderDetails',
  async (orderId, { rejectWithValue }) => {
    try {
      const res1 = await api.get(`/trackOrder/${orderId}`);
      const res2 = await api.get(`/getOrderById/${orderId}`);
      return { track: res1.data.data, detail: res2.data.data };
    } 
    catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
'order/updateOrderStatus',  
  async ( {id, status} , { rejectWithValue }) => {
    try {
      console.log(id);
      console.log(status);
      await api.post(`/updateOrder/${id}`, { status, userType: 'Seller' });
      return status;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const TrackSellerOrderReducer = createSlice({
  name: 'order',
  initialState: {
    orderTrack: null,
    orderDetail: null,
    status: 'idle',
    error: null,
    updateStatus: 'idle'
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrderDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orderTrack = action.payload.track;
        state.orderDetail = action.payload.detail;
        state.error = null;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(updateOrderStatus.pending, (state) => {
        state.updateStatus = 'loading';
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.updateStatus = 'succeeded';
        // update local orderTrack status to keep UI in sync
        if (state.orderTrack) {
          state.orderTrack.order_status = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.updateStatus = 'failed';
      });
  },
});

export default TrackSellerOrderReducer.reducer;
