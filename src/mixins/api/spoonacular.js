const spoonacular = {
    methods: {
      recipeInformation: function (recipeId) {
        debugger;
        return this.$http.get(`/recipes/${recipeId}/information`)
      }
    }
  }

  export default spoonacular;