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

// export const updateOrderStatus = createAsyncThunk(
//   "orders/updateStatus",
//   async (data, { rejectWithValue, getState }) => {
//     console.log("==============", data);
//     try {
//       // Send PATCH request for status update
//       const response = await axios.patch(`${ORDER_API}/orders/update/status/${data.id}`, {
//         status: data.status // Correctly pass the status in the request body
//       });
//       console.log(response.status); // Logs the status code

//       if (response.status === 200) {
//         const state = getState(); // Access the Redux state
//         console.log("Updated order:", response.data.data._id); // Log the updated order data
//         console.log("Current orders in state:", state.orders.orders); // Access and log the orders array
//         const specificOrder = state.orders.orders.find(
//           (order) => order._id === response.data.data._id
//         );
        
//         console.log("Specific Order:", specificOrder);
//       }

//       return response.data; // Returns the updated order
//     } catch (error) {
//       return rejectWithValue(error.response.data || "Error updating order status");
//     }
//   }
// );

export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${ORDER_API}/orders/update/status/${data.id}`, {
        status: data.status
      });
      return response.data.data; // Return only the updated order
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating order status");
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
      // .addCase(updateOrderStatus.fulfilled, (state, action) => {
      //   const updatedOrder = action.payload.data; // Assuming the updated order is in response.data.data
    
      //   // Find the index of the specific order
      //   const index = state.orders.findIndex((order) => order._id === updatedOrder._id);
    
      //   if (index !== -1) {
      //     // Update the specific order in the state
      //     state.orders[index] = updatedOrder;
      //   } else {
      //     console.error("Order not found in state");
      //   }
      // });
      .addCase(fetchAllOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
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
        if (Array.isArray(state.orders)) {
          state.orders = [action.payload.data, ...state.orders];
        }
        state.lastOrder = action.payload.data;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.error = action.payload.data;
      });

    // Update order status (PATCH)
    builder
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload; // Assuming the updated order is in response.data.data
        // Find the index of the specific order
        const index = state.orders.findIndex((order) => order._id === updatedOrder._id);
    
        if (index !== -1) {
          // Update the specific order in the state
          state.orders[index] = updatedOrder;
        } else {
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
