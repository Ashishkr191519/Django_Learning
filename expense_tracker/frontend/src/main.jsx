import { createRoot } from "react-dom/client";
import "./index.css";

import { store } from "./app/store.js";
import { Provider } from "react-redux";
import AppRoutes from "./router/AppRoutes.jsx";
import AuthInitializer from "./features/auth/UI/AuthInitializer.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthInitializer />
    <AppRoutes />
  </Provider>,
);
