import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const progressIndexMap: Record<string, number> = {
  welcome: 0,
  full_name: 1,
  date_of_birth: 2,

  phone_number: 3,
  email: 4,
  blood_type: 5,
  finished: 6,
};

const initialState: { currentPhase: string; index: number } = {
  currentPhase: "welcome",
  index: 0,
};

const progressStateSlice = createSlice({
  name: "onboardingPhase",
  initialState,
  reducers: {
    handlePhase: (state, action: PayloadAction<string>) => {
      state.currentPhase = action.payload;
      state.index = progressIndexMap[action.payload];
    },
  },
});

export const { handlePhase } = progressStateSlice.actions;

export default progressStateSlice.reducer;
