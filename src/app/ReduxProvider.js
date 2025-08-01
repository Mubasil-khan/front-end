"use client"
import { Provider } from "react-redux";
import { store } from "./store";

// ReduxProvider.js
export const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
