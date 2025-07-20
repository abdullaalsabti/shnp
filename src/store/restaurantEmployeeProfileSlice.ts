import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Role {
  code: string;
  name: string;
  privileges: string[];
}

interface RestaurantEmployeeProfile {
  fullNameAr: string;
  fullNameEn: string;
  email: string;
  mobile: string;
  owner: boolean;
  gender: string;
  dateOfBirth: string;
  confirmed: boolean;
  accepted: boolean;
  restaurantNameAr: string;
  restaurantNameEn: string;
  restaurantEmail: string;
  restaurantCity: string | null;
  restaurantDistrict: string | null;
  restaurantFoodCategories: number[];
  restaurantNumberOfBranches: number;
  restaurantManagementPhoneNumber: string;
  restaurantTwitterSocialMediaLink: string;
  restaurantInstagramSocialMediaLink: string;
  restaurantRestaurantStatus: string;
  id: number;
  iban: string;
  commercialRegistrationNumber: string;
  roles: Role[];
  foodCategories: string[];
  imageUrl: string;
}

interface RestaurantEmployeeProfileState {
  profile: RestaurantEmployeeProfile | null;
}

const initialState: RestaurantEmployeeProfileState = {
  profile: null,
};

const restaurantEmployeeProfileSlice = createSlice({
  name: "restaurantEmployeeProfile",
  initialState,
  reducers: {
    setEmployeeProfile: (
      state,
      action: PayloadAction<RestaurantEmployeeProfile>
    ) => {
      state.profile = action.payload;
    },
    clearEmployeeProfile: (state) => {
      state.profile = null;
    },
    updateEmployeeProfile: (
      state,
      action: PayloadAction<Partial<RestaurantEmployeeProfile>>
    ) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
  },
});

export const restaurantEmployeeProfileActions =
  restaurantEmployeeProfileSlice.actions;
export default restaurantEmployeeProfileSlice;
