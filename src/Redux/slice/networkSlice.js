import { createSlice } from '@reduxjs/toolkit';

const networkSlice = createSlice({
  name: 'network',
  initialState : {
    isOffline: false,
  },
  reducers: {
    setOffline: (state) => {
      state.isOffline = true;
    },
    setOnline: (state) => {
      state.isOffline = false;
    },
  },
});

export const { setOffline, setOnline } = networkSlice.actions;
export default networkSlice.reducer;
