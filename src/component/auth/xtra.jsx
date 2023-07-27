import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  isAuth: localStorage.getItem("token") ? true : false,
  id: localStorage.getItem("_id"),
};

const authContext = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, payload) {
      console.log(payload);
      state.token = payload.payload.dataEmail;
      state.id = payload.payload.dataId;
      localStorage.setItem("token", payload.payload.dataEmail);
      localStorage.setItem("_id", payload.payload.dataId);
      state.isAuth = true;
    },
    logout(state) {
      state.token = null;
      state.id = null;
      state.isAuth = false;
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authContext.actions;
export default authContext.reducer;
