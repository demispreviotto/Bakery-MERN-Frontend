import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import recipeService from "./recipeService";

const initialState = {
    recipe: {},
    recipes: [],
    status: 'idle',
    message: '',
}

export const getAllRecipes = createAsyncThunk('recipes/getAll', async () => {
    try {
        return await recipeService.getAllRecipes();
    } catch (error) {
        console.error(error);
    }
})
export const getRecipesById = createAsyncThunk('recipes/getById', async (_id) => {
    try {
        return await recipeService.getRecipesById(_id);
    } catch (error) {
        console.error(error);
    }
})

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllRecipes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllRecipes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.recipes = action.payload;
            })
            .addCase(getAllRecipes.rejected, (state, action) => {
                console.error(action.payload)
                state.status = 'failed';
                state.message = action.error
            })
            .addCase(getRecipesById.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getRecipesById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.recipe = action.payload;
            })
            .addCase(getRecipesById.rejected, (state, action) => {
                console.error(action.payload)
                state.status = 'failed';
                state.message = action.error
            })

    }
})
export default recipeSlice.reducer;