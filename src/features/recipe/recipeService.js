import axios from "axios";

const API_URL = 'http://localhost:8080/recipes/'

const getAll = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}
const getById = async (_id) => {
    const response = await axios.get(API_URL + _id);
    return response.data;
}

const recipeService = {
    getAll,
    getById,
}

export default recipeService;