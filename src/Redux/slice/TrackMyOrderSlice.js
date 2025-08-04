// src/Redux/slice/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

export const trackUserOrder = createAsyncThunk(
  'myOrder/trackUserOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/trackOrder/${orderId}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const cancelUserOrder = createAsyncThunk(
  'myOrder/cancelUserOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      await api.post(`/updateOrder/${orderId}`, {
        status: "Cancelled",
        userType: "User"
      });

      const res = await api.get(`/trackOrder/${orderId}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const TrackMyOrderReducer = createSlice({
  name: 'myOrder',
  initialState: {
    userOrder: null,
    userOrderStatus: 'idle',
    userOrderError: null,
    cancelOrderStatus: 'idle',
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
        .addCase(trackUserOrder.pending, (state) => {
            console.log("action.payload")
            state.userOrderStatus = 'loading';
        })
        .addCase(trackUserOrder.fulfilled, (state, action) => {
            state.userOrderStatus = 'succeeded';
            console.log(action.payload);
            state.userOrder = action.payload;
            state.userOrderError = null;
        })
        .addCase(trackUserOrder.rejected, (state, action) => {
            state.userOrderStatus = 'failed';
            state.userOrderError = action.payload;
        })

        .addCase(cancelUserOrder.pending, (state) => {
            state.cancelOrderStatus = 'loading';
        })
        .addCase(cancelUserOrder.fulfilled, (state, action) => {
            state.cancelOrderStatus = 'succeeded';
            state.userOrder = action.payload;
        })
        .addCase(cancelUserOrder.rejected, (state, action) => {
            state.cancelOrderStatus = 'failed';
        });
    },
});

export default TrackMyOrderReducer.reducer;
