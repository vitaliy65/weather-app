import { configureStore } from "@reduxjs/toolkit";
import animationsReducer from "./slices/animationsSlice";

export const store = configureStore({
  reducer: {
    animations: animationsReducer,
  },
});

// Типы для использования в приложении
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
