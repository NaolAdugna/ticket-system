import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "@/src/utils/axiosConfig";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await instance.post("/auth/login", userData);
      console.log("response from authSlice", response);
      localStorage.setItem("token", response.data.token); // Save token
      console.log("from authSlice", response.data);
      return response.data; // Ensure this returns the full response data, including user and token
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await instance.post("/auth/signup", userData);
      return response.data; // Just returning the signup response
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Initial state for user
    token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // Update user state from the response data
        console.log("action.payload from authSlice", action.payload);
        state.user = action.payload.role; // Set user to the user object from response
        state.token = action.payload.token; // Set token to the token from response
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token); // Save token to localStorage
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;