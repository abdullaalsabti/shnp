import { loadingActions } from "../store/loadingSlice";
import { restaurantProfileActions } from "../store/restaurantProfileSlice";
import { restaurantEmployeeProfileActions } from "../store/restaurantEmployeeProfileSlice";
import { restaurantCountsActions } from "../store/restaurantCountsSlice";
import toast from "../../node_modules/react-hot-toast/src/index";
import type { AuthState } from "../store/authSlice";
import type { i18n } from "i18next";

export default async function fetchAllRestaurantData(
  dispatch: any,
  state: AuthState,
  i18n: i18n
) {
  dispatch(loadingActions.setIsLoading());

  try {
    const [restaurantResponse, employeeResponse, countsResponse] =
      await Promise.all([
        fetch("https://app-stg.shnp.me/api/restaurants/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }),
        fetch(
          `https://app-stg.shnp.me/api/restaurantEmployees/me?locale=${i18n.language}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        ),
        fetch(
          `https://app-stg.shnp.me/api/dashboard/restaurantCounts?locale=${i18n.language}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        ),
      ]);

    // Check if all responses are ok
    if (!restaurantResponse.ok) {
      throw new Error("Error fetching restaurant profile information");
    }
    if (!employeeResponse.ok) {
      throw new Error("Error fetching employee profile information");
    }
    if (!countsResponse.ok) {
      throw new Error("Error fetching restaurant counts information");
    }

    // Parse all responses
    const [restaurantData, employeeData, countsData] = await Promise.all([
      restaurantResponse.json(),
      employeeResponse.json(),
      countsResponse.json(),
    ]);

    // Dispatch all actions
    dispatch(restaurantProfileActions.setProfile(restaurantData));
    dispatch(restaurantEmployeeProfileActions.setEmployeeProfile(employeeData));
    dispatch(restaurantCountsActions.setRestaurantCounts(countsData));
  } catch (err) {
    if (err instanceof Error) {
      toast.error(err.message);
    } else {
      toast.error("An unknown error occurred");
      console.log(err);
    }
  } finally {
    dispatch(loadingActions.setIsNotLoading());
  }
}
