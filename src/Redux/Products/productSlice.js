import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PRODUCT_API = import.meta.env.VITE_API_URL;

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${PRODUCT_API}/products/get`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Error fetching products");
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/add",
  async (product, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.entries(product).forEach(([key, value]) => {
        if (key === "image" && value instanceof File) {
          formData.append(key, value); // Add file object
        } else {
          formData.append(key, value); // Add other fields
        }
      });

      const response = await axios.post(`${PRODUCT_API}/products/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Error adding product");
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/edit",
  async ({ _id, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${PRODUCT_API}/products/update/${_id}`,
        updates
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Error editing product");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (_id, { rejectWithValue }) => {
    try {
      await axios.delete(`${PRODUCT_API}/products/delete/${_id}`);
      return _id;
    } catch (error) {
      return rejectWithValue(error.response.data || "Error deleting product");
    }
  }
);

// Slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all products
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Add product
    builder
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Edit product
    builder
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Delete product
    builder
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
