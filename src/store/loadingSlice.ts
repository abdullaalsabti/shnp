import { createSlice } from "@reduxjs/toolkit";

interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false,
};

const LoadingSlice = createSlice({
  name: "loading",
  initialState: initialState,
  reducers: {
    setIsLoading(state) {
      state.isLoading = true;
    },
    setIsNotLoading(state) {
      state.isLoading = false;
    },
  },
});

export const loadingActions = LoadingSlice.actions;
export default LoadingSlice;
