import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import instance from "../../utils/axiosConfig";
// import ins. from "@/src/utils/axiosConfig"
import instance from "@/src/utils/axiosConfig";
// Fetch tickets
export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token || localStorage.getItem("token"); // Get token safely

      if (!token) {
        return rejectWithValue("No token found. Please log in.");
      }

      const response = await instance.get("/tickets", {
        headers: { Authorization: `${token}` },
      });

      console.log("response", response); // Debugging
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Create ticket
export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async (ticketData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await instance.post("/tickets", ticketData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ticketSlice = createSlice({
  name: "tickets",
  initialState: { tickets: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ticketSlice.reducer;
