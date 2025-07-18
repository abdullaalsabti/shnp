import { configureStore } from "@reduxjs/toolkit";
import LoadingSlice from "./loadingSlice";

const store = configureStore({
  reducer: {
    loadingState: LoadingSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
