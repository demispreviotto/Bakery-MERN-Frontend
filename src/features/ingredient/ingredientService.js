import axios from "axios";

const API_URL = "http://localhost:8080/ingredients/";

const createIngredient = async (data) => {
    const token = JSON.parse(localStorage.getItem("token"))
    const config = { headers: { Authorization: token } };
    const response = await axios.get(API_URL, data, config);
    return response.data;
}
const getAllIngredients = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}
const getIngredientsById = async (_id) => {
    const response = await axios.get(API_URL + 'id/' + _id);
    return response.data;
}
const updateIngredientById = async (_id, data) => {
    const token = JSON.parse(localStorage.getItem("token"))
    const config = { headers: { Authorization: token } };
    const response = await axios.get(API_URL + 'id/' + _id, data, config);
    return response.data;
}
//delete
//getbyname
const ingredientService = {
    createIngredient,
    getAllIngredients,
    getIngredientsById,
    updateIngredientById,
}
export default ingredientService;