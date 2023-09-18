import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plans: null,
};

export const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    //Adicionar Plan
    setPlans: (state, action) => {
      state.plans = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPlans } = plansSlice.actions;

export default plansSlice.reducer;
