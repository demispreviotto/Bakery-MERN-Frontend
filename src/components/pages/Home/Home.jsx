import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllIngredients } from '../../../features/ingredient/ingredientSlice';
import { getAllRecipes } from '../../../features/recipe/recipeSlice';
import Notifications from '../../Notifications/Notifications';
import Loading from '../../common/Loading/Loading';
const Home = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const recipes = useSelector((state) => state.recipe.recipes)
    const ingredients = useSelector((state) => state.ingredient.ingredients)

    useEffect(() => {
        if (!user) { return navigate("/login") };
        dispatch(getAllIngredients())
        dispatch(getAllRecipes())
    }, [])

    if (!ingredients) { <Loading /> }
    if (!recipes) { <Loading /> }


    return (
        <div className='home' style={{ height: '100%' }}>
            <h1>Welcome</h1>
            <Notifications recipes={recipes} ingredients={ingredients} />
            <button>
                {user ? <Link to=''>Go</Link> : <Link to='/login'>Login</Link>}
            </button>
        </div>
    )
}

export default Home