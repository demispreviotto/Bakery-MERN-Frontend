import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ingredientService from "./ingredientService";

const initialState = {
    ingredient: {},
    ingredients: [],
    status: 'idle',
    message: '',
}

export const createIngredient = createAsyncThunk('ingredients/create', async (data) => {
    try {
        return await ingredientService.getAllIngredients();
    } catch (error) {
        console.error(error);
    }
})
export const getAllIngredients = createAsyncThunk('ingredients/getAll', async () => {
    try {
        return await ingredientService.getAllIngredients();
    } catch (error) {
        console.error(error);
    }
})
export const getIngredientsById = createAsyncThunk('ingredients/getById', async (_id) => {
    try {
        return await ingredientService.getIngredientsById(_id);
    } catch (error) {
        console.error(error);
    }
})

export const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createIngredient.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createIngredient.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.ingredients = action.payload;
            })
            .addCase(createIngredient.rejected, (state, action) => {
                state.status = 'failed'
                state.message = action.error;
            })
            .addCase(getAllIngredients.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllIngredients.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.ingredients = action.payload;
            })
            .addCase(getAllIngredients.rejected, (state, action) => {
                state.status = 'failed'
                state.message = action.error;
            })
            .addCase(getIngredientsById.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getIngredientsById.rejected, (state, action) => {
                state.status = 'failed'
                state.message = action.error;
            })
            .addCase(getIngredientsById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                console.log(state, action)
                state.ingredient = action.payload
            })
    }
})
export default ingredientSlice.reducer