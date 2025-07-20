import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface RestaurantCounts {
  numberOfSubscriptions: number;
  numberOfDeliverySubscriptions: number;
  numberOfPickupSubscriptions: number;
  numberOfDeliveredDailyOrders: number;
  numberOfPaidAmount: number;
}

interface RestaurantCountsState {
  restaurantCounts: RestaurantCounts | null;
}

const initialState: RestaurantCountsState = {
  restaurantCounts: null,
};

const restaurantCountSlice = createSlice({
  name: "restaurantCount",
  initialState,
  reducers: {
    setRestaurantCounts: (state, action: PayloadAction<RestaurantCounts>) => {
      state.restaurantCounts = action.payload;
    },
    clearRestaurantCounts: (state) => {
      state.restaurantCounts = null;
    },
  },
});

export const restaurantCountsActions = restaurantCountSlice.actions;
export default restaurantCountSlice;
