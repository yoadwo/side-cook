<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="display-2 font-weight-bold mb-2">Welcome to Side-Cook</h1>
        <p class="subheading font-weight-regular">
          You are the cook, we are the side-kick,
          <br />Together we are...
          <br />You get it ;)
        </p>
      </v-col>

      <v-col>
        <v-img :src="require('../assets/images/side-cook-logo.png')" contain height="200" />
      </v-col>
      <v-col class="mb-1" cols="12">
        <v-row justify="center">
          <v-col cols="9">
            <v-autocomplete
              v-model="selectedIngredients"
              :items="ingredients"
              item-text="name"
              item-value="id"
              label="Ingredients"
              return-object
              multiple
              chips
              clearable
              deletable-chips
              :search-input.sync="searchInput"
              @change="searchInput=''"
              ref="ingredientsInput"
            ></v-autocomplete>
          </v-col>
          <v-col cols="3" class="mt-4">
            <v-btn color="primary" @click="getRecipeList">Let's Cook!</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <div class="d-flex flex-wrap" color="grey lighten-2" flat tile>
            <RecipePreview
              v-for="(recipe, index) in recipeThumbnails"
              :key="index"
              class="pa-2"
              outlined
              tile
              :id="recipe.id"
              :img-src="recipe.image"
              :card-title="recipe.title"
              :used-ingredient-count="recipe.usedIngredientCount"
              :missed-ingredient-count="recipe.missedIngredientCount"
            />
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RecipePreview from "../components/RecipePreview";
import ingredientsList from "../assets/data/ingredients";
import spoonacular from "../mixins/api/spoonacular";
export default {
  name: "Recipes",
  components: {
    RecipePreview
  },
  mixins: [spoonacular],
  data: () => ({
    inDebug: false,
    selectedIngredients: [],
    ingredients: ingredientsList,
    ingredientsMenuProps: {
      closeOnClick: true,
      closeOnContentClick: false,
      disableKeys: false,
      openOnClick: true
    },
    searchInput: "",
    recipeThumbnailsDebug: [
      {
        id: 73420,
        image: "https://spoonacular.com/recipeImages/73420-312x231.jpg",
        imageType: "jpg",
        likes: 0,
        missedIngredientCount: 3,
        missedIngredients: [
          {
            aisle: "Baking",
            amount: 1.0,
            id: 18371,
            image:
              "https://spoonacular.com/cdn/ingredients_100x100/white-powder.jpg",
            meta: [],
            name: "baking powder",
            original: "1 tsp baking powder",
            originalName: "baking powder",
            unit: "tsp",
            unitLong: "teaspoon",
            unitShort: "tsp"
          },
          {
            aisle: "Spices and Seasonings",
            amount: 1.0,
            id: 2010,
            image:
              "https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg",
            meta: [],
            name: "cinnamon",
            original: "1 tsp cinnamon",
            originalName: "cinnamon",
            unit: "tsp",
            unitLong: "teaspoon",
            unitShort: "tsp"
          },
          {
            aisle: "Milk, Eggs, Other Dairy",
            amount: 1.0,
            id: 1123,
            image: "https://spoonacular.com/cdn/ingredients_100x100/egg.png",
            meta: [],
            name: "egg",
            original: "1 egg",
            originalName: "egg",
            unit: "",
            unitLong: "",
            unitShort: ""
          }
        ],
        title: "Apple Or Peach Strudel",
        unusedIngredients: [],
        usedIngredientCount: 1,
        usedIngredients: [
          {
            aisle: "Produce",
            amount: 6.0,
            id: 9003,
            image: "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg",
            meta: [],
            name: "apples",
            original: "6 large baking apples",
            originalName: "baking apples",
            unit: "large",
            unitLong: "larges",
            unitShort: "large"
          }
        ]
      },
      {
        id: 632660,
        image: "https://spoonacular.com/recipeImages/632660-312x231.jpg",
        imageType: "jpg",
        likes: 3,
        missedIngredientCount: 4,
        missedIngredients: [
          {
            aisle: "Milk, Eggs, Other Dairy",
            amount: 1.5,
            extendedName: "unsalted butter",
            id: 1001,
            image:
              "https://spoonacular.com/cdn/ingredients_100x100/butter-sliced.jpg",
            meta: ["unsalted", "cold"],
            name: "butter",
            original: "1 1/2 sticks cold unsalted butter cold unsalted butter<",
            originalName: "cold unsalted butter cold unsalted butter<",
            unit: "sticks",
            unitLong: "sticks",
            unitShort: "sticks"
          },
          {
            aisle: "Produce",
            amount: 4.0,
            id: 1079003,
            image:
              "https://spoonacular.com/cdn/ingredients_100x100/red-delicious-apples.png",
            meta: [
              "red",
              " such as golden delicious, peeled, cored and cut into 1/4-inch-thick slices "
            ],
            name: "red apples",
            original:
              "4 larges red apples, such as Golden Delicious, peeled, cored and cut into 1/4-inch-thick slices",
            originalName:
              "s red apples, such as Golden Delicious, peeled, cored and cut into 1/4-inch-thick slices",
            unit: "large",
            unitLong: "larges",
            unitShort: "large"
          },
          {
            aisle: "Spices and Seasonings",
            amount: 2.0,
            id: 2010,
            image:
              "https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg",
            meta: [],
            name: "cinnamon",
            original: "2 teaspoons cinnamon",
            originalName: "cinnamon",
            unit: "teaspoons",
            unitLong: "teaspoons",
            unitShort: "tsp"
          },
          {
            aisle: "Nut butters, Jams, and Honey",
            amount: 2.0,
            id: 19719,
            image:
              "https://spoonacular.com/cdn/ingredients_100x100/apricot-jam.jpg",
            meta: ["melted"],
            name: "apricot preserves",
            original: "2 tablespoons apricot preserves, melted and strained",
            originalName: "apricot preserves, melted and strained",
            unit: "tablespoons",
            unitLong: "tablespoons",
            unitShort: "Tbsp"
          }
        ],
        title: "Apricot Glazed Apple Tart",
        unusedIngredients: [
          {
            aisle: "Produce",
            amount: 1.0,
            id: 9003,
            image: "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg",
            meta: [],
            name: "apples",
            original: "apples",
            originalName: "apples",
            unit: "serving",
            unitLong: "serving",
            unitShort: "serving"
          }
        ],
        usedIngredientCount: 0,
        usedIngredients: []
      }
    ],
    recipeThumbnails: []
  }),
  methods: {
    getRecipeList() {
      // use name as 'key' because the api queries by name rather than id
      let ingredientsKeys = this.selectedIngredients.map(s => s.name);
      if (this.inDebug) {
        this.recipeThumbnails = this.recipeThumbnailsDebug;
      } else {
        this.searchRecipes(ingredientsKeys, 8)
          .then(resp => {
            if (resp.status === 200) {
              this.recipe = resp.data;
              let sortByUsedIncreasing = function(recpA, recpB) {
                return recpB.usedIngredientCount - recpA.usedIngredientCount;
              };
              this.recipeThumbnails = resp.data.sort(sortByUsedIncreasing);
            } else {
              console.log("unhandled successful response with status <>200");
              throw resp;
            }
          })
          .catch(err => {
            console.log("unhandled error response");
            throw resp;
          });
      }
    },
    clearExtraInput(MouseEvent) {
      debugger;
    }
  }
};
</script>
