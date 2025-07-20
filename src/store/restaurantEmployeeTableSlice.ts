import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Types
interface Role {
  code: string;
  name: string;
  privileges: string[];
}

interface RestaurantEmployee {
  id: number;
  fullNameAr: string;
  fullNameEn: string;
  email: string;
  mobile: string;
  owner: boolean;
  gender: string;
  dateOfBirth: string | null;
  confirmed: boolean;
  accepted: boolean;
  restaurantNameAr: string | null;
  restaurantNameEn: string | null;
  restaurantEmail: string | null;
  restaurantCity: string | null;
  restaurantDistrict: string | null;
  restaurantFoodCategories: string | null;
  restaurantNumberOfBranches: number | null;
  restaurantManagementPhoneNumber: string | null;
  restaurantTwitterSocialMediaLink: string | null;
  restaurantInstagramSocialMediaLink: string | null;
  restaurantRestaurantStatus: string | null;
  iban: string | null;
  commercialRegistrationNumber: string | null;
  roles: Role[];
  foodCategories: string | null;
  imageUrl: string | null;
}

interface RestaurantEmployeeTableData {
  total: number;
  limit: number;
  offset: number;
  matches: RestaurantEmployee[];
}

interface RestaurantEmployeeTableState {
  data: RestaurantEmployeeTableData | null;
}

// Initial state
const initialState: RestaurantEmployeeTableState = {
  data: null,
};

// Slice
const restaurantEmployeeTableSlice = createSlice({
  name: "restaurantEmployeeTable",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<RestaurantEmployeeTableData>) => {
      state.data = action.payload;
    },
  },
});

// Actions
export const restaurantEmployeeTableActions =
  restaurantEmployeeTableSlice.actions;

export default restaurantEmployeeTableSlice;

// Export types
export type {
  RestaurantEmployee,
  Role,
  RestaurantEmployeeTableData,
  RestaurantEmployeeTableState,
};
