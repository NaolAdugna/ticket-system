"use client";

import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
// import { store } from "";
import store from "@/src/redux/store";

export default function ClientProvider({ children, session }) {
  return (
    <Provider store={store}>
      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </Provider>
  );
}