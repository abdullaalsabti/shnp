import { redirect } from "react-router-dom";
import store from "../store/store";
import toast from "../../node_modules/react-hot-toast/src/index";


export default function checkIsAuthLoader() {
  const authState = store.getState().authState;
  console.log(authState);
  if (!authState.token || !authState.refreshToken) {
    toast.error("you must login or create an account first!");
    return redirect("/login");
  }
}

export function checkIsNotAuthLoader() {
  const authState = store.getState().authState;
  console.log(authState);
  if (authState.token && authState.refreshToken) {
    toast.error("you must logout first!")
    return redirect("/dashboard");
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
