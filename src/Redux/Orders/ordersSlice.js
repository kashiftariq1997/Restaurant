import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ORDER_API = import.meta.env.VITE_API_URL;

// Async thunks
export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ORDER_API}/orders/get`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Error fetching orders");
    }
  }
);

export const fetchOrdersByPhone = createAsyncThunk(
  "orders/fetchByPhone",
  async (phone, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ORDER_API}/orders/get/phone/${phone}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching orders by phone");
    }
  }
);

export const addOrder = createAsyncThunk(
  "orders/add",
  async (order, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${ORDER_API}/orders/add`, order);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Error adding order");
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ _id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${ORDER_API}/orders/update/${_id}`, {
        status,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Error updating order");
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/delete",
  async (_id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ORDER_API}/orders/delete/${_id}`);
      return _id;
    } catch (error) {
      return rejectWithValue(error.response.data || "Error deleting order");
    }
  }
);

// Slice
const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    lastOrder: null,
  },
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    // Fetch all orders
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        // console.log("ordersSlice: ", action.payload);
        state.status = "succeeded";
        state.orders = action.payload.data;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });

    // Add order
    builder
      .addCase(addOrder.fulfilled, (state, action) => {
        // console.log("orderSlice: ", action.payload.data);
        if (Array.isArray(state.orders)) {
          state.orders = [action.payload.data, ...state.orders];
        }
        state.lastOrder = action.payload.data;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.error = action.payload.data;
      });

    // Update order status
    builder
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Delete order
    builder
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
