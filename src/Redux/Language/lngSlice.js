import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lng: "en",
};

const languageSlice = createSlice({
  name: "lng",
  initialState,
  reducers: {
    setLng: (state, action) => {
      state.lng = action.payload;
    },
  },
});

export const { setLng } = languageSlice.actions;
export default languageSlice.reducer;
