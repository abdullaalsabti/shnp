import type { AppDispatch, RootState } from "./store";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

// created the typed version of useDispatch:
export const useApplicationDispatch: () => AppDispatch = useDispatch;

// created the typed version of useSelector:
export const useApplicationSelector: TypedUseSelectorHook<RootState> =
  useSelector;
