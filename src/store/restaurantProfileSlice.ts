import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface RestaurantProfile {
  nameAr: string;
  imageUrl: string;
  nameEn: string;
  email: string;
  managementPhoneNumber: string;
  registrationNumber: string;
  foodCategories: number[];
  restaurantStatus: string;
  twitterSocialMediaLink: string;
  instagramSocialMediaLink: string;
  id: number;
  bankAccountIban: string;
  mainMenuId: number;
  deliveryFees: number;
  // Add other fields as needed
}

interface RestaurantProfileState {
  profile: RestaurantProfile | null;
}

const initialState: RestaurantProfileState = {
  profile: null,
};

const restaurantProfileSlice = createSlice({
  name: "restaurantProfile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<RestaurantProfile>) => {
      state.profile = action.payload;
    },
    clearProfile: (state) => {
      state.profile = null;
    },
  },
});

export const restaurantProfileActions = restaurantProfileSlice.actions;
export default restaurantProfileSlice;
