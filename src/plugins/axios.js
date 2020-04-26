import Vue from 'vue';
import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    timeout: 5000,
    headers: {
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'}
  });

Vue.prototype.$http = instance
