const spoonacular = {
    methods: {
      recipeInformation: function (recipeId) {
        return this.$http.get(`/recipes/${recipeId}/information`)
      },
      searchRecipes: function (recipesArray, maxResults, ) {
        // array of strings
        // endpoint supports query by name, not by id
        let queryParams = {
          "number": maxResults,
          "ranking": "1", // maximize used ingredients (1) or minimize missing ingredients (2) 
          "ignorePantry": true, // ignore pantry ingredients such as water, salt, flour etc.
          "ingredients": recipesArray.toString()
        }
        return this.$http.get(`/recipes/findByIngredients`, {
          params: queryParams
        });
      }
    }
  }

  export default spoonacular;