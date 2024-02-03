import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../../../features/recipe/recipeSlice';
import RecipeCard from '../../Recipe/RecipeCard/RecipeCard';
import NewRecipe from '../../Recipe/NewRecipe/NewRecipe'
import ModalHigher from '../../common/Modal/ModalHigher';
import './RecipesPage.scss'
const RecipesPage = () => {
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipe.recipes);

    const [searchCriteria, setSearchCriteria] = useState({
        parameter: '',
        value: '',
    });
    const handleSearchChange = (e) => {
        setSearchCriteria({
            ...searchCriteria,
            value: e.target.value,
        });
    };
    const filteredIngredients = recipes.filter((recipe) => {
        if (!searchCriteria.value) {
            return true;
        }
        const parameterValue = recipe[searchCriteria.parameter];
        const valueMatch = parameterValue && parameterValue.toLowerCase().includes(searchCriteria.value.toLowerCase());
        return valueMatch;
    })

    useEffect(() => {
        dispatch(getAllRecipes());
    }, []);

    return (
        <div className='recipes-page'>
            <h2>Recipes</h2>
            <div className="search-container">
                <form className='search-form'>
                    <input type="text" value={searchCriteria.value} onChange={handleSearchChange} placeholder="Search..." />
                    <select
                        value={searchCriteria.parameter}
                        onChange={(e) => setSearchCriteria({ ...searchCriteria, parameter: e.target.value })}
                    >
                        <option value="recipeName">Name</option>
                        <option value="type">Type</option>
                        <option value="provider">Provider</option>
                    </select>
                </form>
            </div>
            <div className="container">
                {filteredIngredients.map((recipe) => (
                    <RecipeCard key={recipe._id} recipe={recipe} />
                ))}
            </div>
            <ModalHigher>
                <NewRecipe />
            </ModalHigher>
        </div>

    );
};

export default RecipesPage;
