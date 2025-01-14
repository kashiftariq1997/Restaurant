import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USER_API = import.meta.env.VITE_API_URL;

// Async thunks
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${USER_API}/users/profile/${_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Error fetching user profile"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ _id, profileData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${USER_API}/users/update/${_id}`,
        profileData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Error updating user profile"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${USER_API}/users/signup`, userData);

      return response.data;
    } catch (error) {
      // console.log(error, "userSlice");
      return rejectWithValue(
        error.response?.data?.message || "Error registering user"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${USER_API}/users/login`, credentials);
      const { accessToken, data } = response.data;

      sessionStorage.setItem("token", accessToken);
      sessionStorage.setItem("user", JSON.stringify(data));

      return { accessToken, data };
    } catch (error) {
      // Return a meaningful error message
      return rejectWithValue(
        error.response?.data?.message || "Invalid credentials. Please try again."
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Clear user and token data from sessionStorage
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("persist:user");

      return; // Return nothing as the state is cleared on the client side
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error logging out user"
      );
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    allUsers: [],
    accessToken: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.profile = null;
      state.allUsers = [];
      state.accessToken = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch user profile
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Update user profile
    builder
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Register user
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload.data;
        state.accessToken = action.payload.accessToken;
        state.allUsers.push(action.payload.data);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Login user
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload.data;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Logout user
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.profile = null;
        state.accessToken = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
