import { redirect } from "react-router-dom";
import store from "../store/store";

export default function checkIsAuthLoader() {
  const authState = store.getState().authState;
  console.log(authState);
  if (!authState.token || !authState.refreshToken) {
    return redirect("/login");
  }
}

export function checkIsNotAuthLoader() {
  const authState = store.getState().authState;
  console.log(authState);
  if (authState.token && authState.refreshToken) {
    return redirect("/home");
  }
}
