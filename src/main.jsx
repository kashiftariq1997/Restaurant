import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import i18n from "./i18n.js";
import { Provider } from "react-redux";
import store, { persistor } from "./Redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import WrappedApp from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WrappedApp />
      </PersistGate>
    </Provider>
  </StrictMode>
);
