// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import api from "../../api";
// import toast from "react-hot-toast";

// export const loginUser = createAsyncThunk("login/loginUser", async ( formData, { rejectWithValue }) => {
//     try{
//       const res = await api.post("/userLogin", formData);

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//     }
//     catch(error){
//         return rejectWithValue(error.response.data.message)
//     }
//   }

// );

// const loginSlice = createSlice({
//   name: 'login',
//   initialState: {
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(loginUser.fulfilled, (state) => {
//         state.status = 'succeeded';
//         toast.success("Login successful");
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.status = 'failed';
//         toast.error(action.payload);
//       });
//   },
// });

// export default loginSlice.reducer;