import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  expirationDate: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("jwt"),
  refreshToken: localStorage.getItem("refreshToken"),
  isAuthenticated: localStorage.getItem("jwt") ? true : false,
  expirationDate: localStorage.getItem("expirationDate"),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string; refreshToken: string }>
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;

      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
      state.expirationDate = expiration.toISOString();

      localStorage.setItem("jwt", action.payload.token);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("expirationDate", expiration.toISOString());
    },

    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.expirationDate = null;
      localStorage.removeItem("jwt");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("expirationDate");
    },
  },
});

export const authSliceActions = authSlice.actions;
export default authSlice;
