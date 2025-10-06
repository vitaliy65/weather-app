import { ConditionList } from "@/types/conditionList";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnimationsState {
  active: boolean;
  activeCondition: ConditionList;
}

const initialState: AnimationsState = {
  active: true,
  activeCondition: ConditionList.none, // Значение по умолчанию, можно изменить на нужное
};

export const animationsSlice = createSlice({
  name: "animations",
  initialState,
  reducers: {
    toggleAnimations: (state) => {
      state.active = !state.active;
    },
    setActiveBG: (state, action: PayloadAction<ConditionList>) => {
      state.activeCondition = action.payload;
    },
  },
});

export const { toggleAnimations, setActiveBG } = animationsSlice.actions;
export default animationsSlice.reducer;
