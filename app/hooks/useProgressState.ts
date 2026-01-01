"use client";
import { AppDispatch, RootState } from "@/app/store/store";
import { useDispatch, useSelector } from "react-redux";
import { handlePhase } from "../store/useProgressSlice";
export const useProgressState = () => {
  const dispatch = useDispatch<AppDispatch>();
  const progressState = useSelector((state: RootState) => state.progressState);

  return { dispatch, progressState, handlePhase };
};
