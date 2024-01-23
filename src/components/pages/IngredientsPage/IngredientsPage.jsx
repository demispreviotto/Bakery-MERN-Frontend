import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllIngredients } from '../../../features/ingredient/ingredientSlice';
import IngredientCard from '../../Ingredient/IngredientCard/IngredientCard';
import NewIngredient from '../../Ingredient/NewIngredient/NewIngredient';
import ModalHigher from '../../common/Modal/ModalHigher';
import "./IngredientsPage.scss"

const IngredientList = () => {
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
        <>
            <h2>Ingredients</h2>
            <div className="ingredient-search">
                <form className='search-form'>
                    <input type="text" value={searchCriteria.value} onChange={handleSearchChange} placeholder="Search..." />
                    <div className='radio-container'>
                        <label>
                            <input
                                type="radio"
                                value="ingredientName"
                                checked={searchCriteria.parameter === 'ingredientName'}
                                onChange={() => setSearchCriteria({ ...searchCriteria, parameter: 'ingredientName' })}
                            />
                            <span>Ingredient Name</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="type"
                                checked={searchCriteria.parameter === 'type'}
                                onChange={() => setSearchCriteria({ ...searchCriteria, parameter: 'type' })}
                            />
                            <span>Type</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="provider"
                                checked={searchCriteria.parameter === 'provider'}
                                onChange={() => setSearchCriteria({ ...searchCriteria, parameter: 'provider' })}
                            />
                            <span>Provider</span>
                        </label>
                    </div>
                </form>
            </div>
            <div className="ingredient-list">
                <div className="container">
                    {filteredIngredients.map((ingredient) => (
                        <IngredientCard key={ingredient._id} ingredient={ingredient} />
                    ))}
                </div>
            </div>
            <ModalHigher>
                <NewIngredient />
            </ModalHigher>

        </>
    );
};

export default IngredientList;