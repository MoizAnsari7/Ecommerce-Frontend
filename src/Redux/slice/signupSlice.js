// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import api from "../../api";
// import toast from "react-hot-toast";

// export const signupUser = createAsyncThunk("signup/signupUser", async (formData, { rejectWithValue }) => {
//     try {
//       const res = await api.post("/userSignup", formData);
//       return res.data;
//     }
//     catch (error) {
//       return rejectWithValue(error.response.data.message || "Signup failed");
//     }
//   }
// );

// const signupSlice = createSlice({
//   name: 'signup',
//   initialState: {
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(signupUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(signupUser.fulfilled, (state) => {
//         state.status = 'succeeded';
//         toast.success("Signup successful");
//       })
//       .addCase(signupUser.rejected, (state, action) => {
//         state.status = 'failed';
//         toast.error(action.payload);
//       });
//   },
// });

// export default signupSlice.reducer;