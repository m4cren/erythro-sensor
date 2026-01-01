import { configureStore } from "@reduxjs/toolkit";

import progressStateSliceReducer from "./useProgressSlice";

export const store = configureStore({
  reducer: {
    progressState: progressStateSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
