import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories, fetchProductByCategoryId, fetchProducts } from "./HomeThunks";

const initialState = {
    isLoading: false,
    dataProducts: [],
    dataCategories: [],
    productsByCategory: []
}

const homeSlice = createSlice({
    name: 'homeSlice',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        /*
            Update value from HomeThunks
        */
        builder
        .addCase(fetchProducts.pending,(state,action) => {
            state.isLoading = true
        })
        .addCase(fetchProducts.fulfilled, (state,action) => {
            state.dataProducts = action.payload
        })
        // .addCase(fetchCategories.pending,(state,action) => {
        //     state.isLoading = true
        // })
        .addCase(fetchCategories.fulfilled, (state,action) => {
            state.dataCategories = action.payload
        })
        .addCase(fetchProductByCategoryId.fulfilled, (state,action) => {
            state.dataProducts = action.payload
        })
    }
})

export default homeSlice.reducer