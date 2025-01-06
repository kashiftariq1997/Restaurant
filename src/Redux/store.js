import { configureStore } from "@reduxjs/toolkit";
import lngSlice from "./Language/lngSlice";
import cartSlice from "./Cart/cartSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import ordersSlice from "./Orders/ordersSlice";
import sidebarSlice from "./Other/sidebarSlice";
import productSlice from "./Products/productSlice";
import userSlice from "./Users/userSlice";

const persistCart = {
  key: "cart",
  storage,
};

const persistOrders = {
  key: "orders",
  storage,
};

const persistSidebar = {
  key: "sidebar",
  storage,
};

const persistUser = {
  key: "user",
  storage,
};

const persistedCartReducer = persistReducer(persistCart, cartSlice);
const persistedOrdersReducer = persistReducer(persistOrders, ordersSlice);
const persistedSidebarReducer = persistReducer(persistSidebar, sidebarSlice);
const persistedUserReducer = persistReducer(persistUser, userSlice);

const store = configureStore({
  reducer: {
    lng: lngSlice,
    cart: persistedCartReducer,
    orders: persistedOrdersReducer,
    sidebar: persistedSidebarReducer,
    products: productSlice,
    users: persistedUserReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
