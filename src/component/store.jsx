import { configureStore } from "@reduxjs/toolkit";
import authContext from "./auth/xtra";
import expenseReducer from "./expenseStore";

const store = configureStore({
  reducer: { auth: authContext, expenses: expenseReducer },
});

export default store;
