import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
        headers: { Authorization: `${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update ticket status
export const updateTicketStatus = createAsyncThunk(
  "tickets/updateTicketStatus",
  async ({ ticketId, status }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await instance.patch(
        `/tickets/${ticketId}`,
        { status },
        {
          headers: { Authorization: `${token}` },
        }
      );
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
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.tickets.push(action.payload);
      })
      .addCase(updateTicketStatus.fulfilled, (state, action) => {
        const index = state.tickets.findIndex(
          (ticket) => ticket._id === action.payload._id
        );
        if (index !== -1) {
          state.tickets[index] = action.payload;
        }
      });
  },
});

export default ticketSlice.reducer;
