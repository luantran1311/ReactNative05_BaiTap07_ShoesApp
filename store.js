import { configureStore } from "@reduxjs/toolkit";
import HomeReducer from "./screens/home/HomeSlice";

export const store = configureStore({
    reducer: {
        home: HomeReducer
    }
})