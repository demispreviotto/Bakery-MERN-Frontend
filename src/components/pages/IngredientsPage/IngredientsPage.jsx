import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllIngredients } from '../../../features/ingredient/ingredientSlice';
import IngredientCard from '../../Ingredient/IngredientCard/IngredientCard';
import NewIngredient from '../../Ingredient/NewIngredient/NewIngredient';
import ModalHigher from '../../common/Modal/ModalHigher';
import "./IngredientsPage.scss"

const IngredientsPage = () => {
    const dispatch = useDispatch();
    const ingredients = useSelector((state) => state.ingredient.ingredients);

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
    const filteredIngredients = ingredients.filter((ingredient) => {
        if (!searchCriteria.value) {
            return true;
        }
        const parameterValue = ingredient[searchCriteria.parameter];
        const valueMatch = parameterValue && parameterValue.toLowerCase().includes(searchCriteria.value.toLowerCase());
        return valueMatch;
    });
    useEffect(() => {
        dispatch(getAllIngredients());
    }, []);

    return (
        <div className='ingredients-page'>
            <h2>Ingredients</h2>
            <div className="search-container">
                <form className='search-form'>
                    <input type="text" value={searchCriteria.value} onChange={handleSearchChange} placeholder="Search..." />
                    <select
                        value={searchCriteria.parameter}
                        onChange={(e) => setSearchCriteria({ ...searchCriteria, parameter: e.target.value })}
                    >
                        <option value="ingredientName">Name</option>
                        <option value="type">Type</option>
                        <option value="provider">Provider</option>
                    </select>
                </form>
            </div>
            <div className="container">
                {filteredIngredients.map((ingredient) => (
                    <IngredientCard key={ingredient._id} ingredient={ingredient} />
                ))}
            </div>
            <ModalHigher>
                <NewIngredient />
            </ModalHigher>
        </div>
    );
};

export default IngredientsPage;