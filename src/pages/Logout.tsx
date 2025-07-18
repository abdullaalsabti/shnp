import { redirect } from "react-router-dom";
import store from "../store/store";
import { authSliceActions } from "../store/authSlice";
import toast from "../../node_modules/react-hot-toast/src/index";

export function logoutAction() {
  store.dispatch(authSliceActions.logout());
  toast.success("logged out!");
  return redirect("/login");
}
