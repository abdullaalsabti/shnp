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

export function getRemainingTokenDuration() {
  const storedExpirationDate = store.getState().authState.expirationDate;

  if (!storedExpirationDate) {
    return 0;
  }

  const expirationDate = new Date(storedExpirationDate);
  const currentDate = new Date();

  const remainingTime = expirationDate.getTime() - currentDate.getTime();
  return remainingTime > 0 ? remainingTime : 0;
}
