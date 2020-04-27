import axios from 'axios'
import spoonacular from '../assets/data/tok/spooncular/f1'

const instance = axios.create({
    baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    timeout: 5000,
    headers: {
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
        'x-rapidapi-key': spoonacular
    }
});

export default instance;
