import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalItems: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const uniqueId = `${item._id}-${item.selectedSize?.size || "default"}-${
        item.selectedExtras?.map((extra) => extra._id).join("-") || "no-extras"
      }`;

      const existingItem = state.items.find((i) => i.uniqueId === uniqueId);

      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        state.items.push({
          ...item,
          uniqueId,
          quantity: item.quantity || 1,
        });
      }

      const extrasTotal = (item.selectedExtras || []).reduce(
        (sum, extra) => sum + extra.price,
        0
      );

      state.totalPrice +=
        ((item.selectedSize?.price || item.price) + extrasTotal) *
        (item.quantity || 1);
      state.totalItems += item.quantity || 1;
    },

    removeFromCart: (state, action) => {
      const uniqueId = action.payload;
      const itemToRemove = state.items.find((item) => item.uniqueId === uniqueId);

      if (itemToRemove) {
        const extrasTotal = (itemToRemove.selectedExtras || []).reduce(
          (sum, extra) => sum + extra.price,
          0
        );

        state.totalPrice -=
          ((itemToRemove.selectedSize?.price || itemToRemove.price) +
            extrasTotal) *
          itemToRemove.quantity;
        state.totalItems -= itemToRemove.quantity;
      }

      state.items = state.items.filter((item) => item.uniqueId !== uniqueId);
    },

    incrementQuantity: (state, action) => {
      const uniqueId = action.payload;
      const existingItem = state.items.find((item) => item.uniqueId === uniqueId);

      if (existingItem) {
        const extrasTotal = (existingItem.selectedExtras || []).reduce(
          (sum, extra) => sum + extra.price,
          0
        );

        existingItem.quantity += 1;
        state.totalPrice +=
          (existingItem.selectedSize?.price || existingItem.price) +
          extrasTotal;
        state.totalItems += 1;
      }
    },

    decrementQuantity: (state, action) => {
      const uniqueId = action.payload;
      const existingItem = state.items.find((item) => item.uniqueId === uniqueId);

      if (existingItem) {
        const extrasTotal = (existingItem.selectedExtras || []).reduce(
          (sum, extra) => sum + extra.price,
          0
        );

        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.totalPrice -=
            (existingItem.selectedSize?.price || existingItem.price) +
            extrasTotal;
          state.totalItems -= 1;
        } else {
          state.totalPrice -=
            (existingItem.selectedSize?.price || existingItem.price) +
            extrasTotal;
          state.totalItems -= 1;
          state.items = state.items.filter((item) => item.uniqueId !== uniqueId);
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalItems = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
