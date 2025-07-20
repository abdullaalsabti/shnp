import { configureStore } from "@reduxjs/toolkit";
import LoadingSlice from "./loadingSlice";
import authSlice from "./authSlice";
import restaurantProfileSlice from "./restaurantProfileSlice";
import restaurantCountSlice from "./restaurantCountsSlice";

const store = configureStore({
  reducer: {
    loadingState: LoadingSlice.reducer,
    authState: authSlice.reducer,
    restaurantProfileState: restaurantProfileSlice.reducer,
    restaurantCounts: restaurantCountSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
