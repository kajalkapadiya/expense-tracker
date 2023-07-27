import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const expenseReducer = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    get(state, payload) {
      let temp = {
        name: payload.payload.description,
        amount: payload.payload.amount,
        desc: payload.payload.category,
      };
      // state.initialState.push(temp);

      // console.log(temp);
    },
  },
});

console.log(initialState);

export const expensesActions = expenseReducer.actions;
export default expenseReducer.reducer;
