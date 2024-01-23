import axios from "axios";

const API_URL = 'http://localhost:8080/recipes/'

const getAllRecipes = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const config = { headers: { Authorization: token } }
    const response = await axios.get(API_URL, config);
    return response.data;
}
const getRecipesById = async (_id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const config = { headers: { Authorization: token } }
    const response = await axios.get(API_URL + _id, config);
    return response.data;
}

const recipeService = {
    getAllRecipes,
    getRecipesById,
}

export default recipeService;