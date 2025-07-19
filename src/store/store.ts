import { configureStore } from "@reduxjs/toolkit";
import LoadingSlice from "./loadingSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    loadingState: LoadingSlice.reducer,
    authState: authSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
