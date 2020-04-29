<template>
  <div ref="recipe_single" class="recipe_single">
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex md10 xs12 offset-md1 v-if="recipe">
          <v-layout row wrap>
            <v-flex xs12 sm6 md4>
              <v-card>
                <v-img :src="recipe.image" height="300px"></v-img>
              </v-card>
            </v-flex>
            <v-flex xs12 sm6 md8 class="recipe_info">
              <h1 class="headline mb-0">{{recipe.title}}</h1>
              <ul class="preparation_meta">
                <li v-if="recipe.readyInMinutes">
                  <p>
                    <strong>READY TIME</strong>
                    {{recipe.readyInMinutes}} {{ recipe.readyInMinutes > 1 ? 'minutes' : 'minute' }}
                  </p>
                </li>
                <li v-if="recipe.preparationMinutes && recipe.readyInMinutes - recipe.preparationMinutes > 0">
                  <p>
                    <strong>PREPARATION TIME</strong>
                    {{recipe.preparationMinutes}} {{ recipe.preparationMinutes > 1 ? 'minutes' : 'minute' }}
                  </p>
                </li>
                <li v-if="recipe.cookingMinutes">
                  <p>
                    <strong>COOKING TIME</strong>
                    {{recipe.cookingMinutes}} {{ recipe.cookingMinutes > 1 ? 'minutes' : 'minute' }}
                  </p>
                </li>
                <li>
                  <p>
                    <strong>SERVINGS</strong>
                    {{recipe.servings}} {{ recipe.servings > 1 ? 'persons' : 'person' }}
                  </p>
                </li>
              </ul>
            </v-flex>
          </v-layout>
          <ul class="recipe_meta">
            <li v-if="recipe.dishTypes">
              <p>
                <strong>Dish Types</strong>
                <v-chip
                  class="success dark--text mx-1 text-capitalize"
                  v-for="(type, index) in recipe.dishTypes"
                  :key="index"
                >{{type}}</v-chip>
              </p>
            </li>
            <li>
              <p>
                <strong>Diet Types</strong>
                <v-chip
                  class="primary dark--text mx-1"
                  v-for="(type, index) in computedDietTypes"
                  :key="index"
                >{{type}}</v-chip>
              </p>
            </li>
          </ul>
          <p class="mt-5"></p>
          <v-card class="white">
            <v-layout row wrap class="recipe_content_wrap">
              <v-flex xs12 md6>
                <h1 class="headline mb-0">Ingredients:</h1>
                <v-list avatar>
                  <v-list-item
                    dense
                    v-for="(item, index) in recipe.extendedIngredients"
                    :key="index"
                  >
                    <v-img
                      max-height="8.5%"
                      max-width="8.5%"
                      :src="require('../assets/images/np-fork.png')"
                    ></v-img>
                    <v-list-item-content>
                      <v-list-item-title>{{item.originalString}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-flex>
              <v-flex xs12 md6>
                <h1 class="headline mb-0">Preparation:</h1>
                <p v-for="(p, index) in formattedInstructions" :key="index">{{p}}</p>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import spoonacular from "../mixins/api/spoonacular";
export default {
  name: "Recipe",
  mixins: [spoonacular],
  data: () => {
    return {
      inDebug: false,
      recipeDebug: {
        vegetarian: true,
        vegan: false,
        glutenFree: true,
        dairyFree: false,
        veryHealthy: false,
        cheap: false,
        veryPopular: true,
        sustainable: false,
        weightWatcherSmartPoints: 18,
        gaps: "no",
        lowFodmap: false,
        preparationMinutes: 5,
        cookingMinutes: 10,
        aggregateLikes: 589,
        spoonacularScore: 58.0,
        healthScore: 6.0,
        creditsText: "Feed Me Phoebe",
        sourceName: "Feed Me Phoebe",
        pricePerServing: 325.15,
        extendedIngredients: [
          {
            id: 11959,
            aisle: "Produce",
            image: "arugula-or-rocket-salad.jpg",
            consistency: "solid",
            name: "baby arugula",
            original: "1 handful baby arugula",
            originalString: "1 handful baby arugula",
            originalName: "baby arugula",
            amount: 1.0,
            unit: "handful",
            meta: [],
            metaInformation: [],
            measures: {
              us: { amount: 1.0, unitShort: "handful", unitLong: "handful" },
              metric: { amount: 1.0, unitShort: "handful", unitLong: "handful" }
            }
          },
          {
            id: 99059,
            aisle: "Gluten Free",
            image: "hamburger-bun.jpg",
            consistency: "solid",
            name: "gluten-free burger buns",
            original:
              "4 burger buns (I used Canyon Bakehouse Gluten-Free rolls)",
            originalString:
              "4 burger buns (I used Canyon Bakehouse Gluten-Free rolls)",
            originalName:
              "burger buns (I used Canyon Bakehouse Gluten-Free rolls)",
            amount: 4.0,
            unit: "",
            meta: ["gluten-free", "(I used Canyon Bakehouse rolls)"],
            metaInformation: ["gluten-free", "(I used Canyon Bakehouse rolls)"],
            measures: {
              us: { amount: 4.0, unitShort: "", unitLong: "" },
              metric: { amount: 4.0, unitShort: "", unitLong: "" }
            }
          },
          {
            id: 6150,
            aisle: "Condiments",
            image: "barbecue-sauce.jpg",
            consistency: "solid",
            name: "bbq sauce",
            original: "1/2 cup romesco sauce",
            originalString: "1/2 cup romesco sauce",
            originalName: "romesco sauce",
            amount: 0.5,
            unit: "cup",
            meta: [],
            metaInformation: [],
            measures: {
              us: { amount: 0.5, unitShort: "cups", unitLong: "cups" },
              metric: {
                amount: 118.294,
                unitShort: "ml",
                unitLong: "milliliters"
              }
            }
          },
          {
            id: 1009,
            aisle: "Cheese",
            image: "cheddar-cheese.png",
            consistency: "solid",
            name: "mild cheddar cheese",
            original: "4 slices young manchego or mild cheddar cheese",
            originalString: "4 slices young manchego or mild cheddar cheese",
            originalName: "young manchego or mild cheddar cheese",
            amount: 4.0,
            unit: "slices",
            meta: [],
            metaInformation: [],
            measures: {
              us: { amount: 4.0, unitShort: "slice", unitLong: "slices" },
              metric: { amount: 4.0, unitShort: "slice", unitLong: "slices" }
            }
          },
          {
            id: 4053,
            aisle: "Oil, Vinegar, Salad Dressing",
            image: "olive-oil.jpg",
            consistency: "liquid",
            name: "olive oil",
            original: "Olive oil",
            originalString: "Olive oil",
            originalName: "Olive oil",
            amount: 4.0,
            unit: "servings",
            meta: [],
            metaInformation: [],
            measures: {
              us: { amount: 4.0, unitShort: "servings", unitLong: "servings" },
              metric: {
                amount: 4.0,
                unitShort: "servings",
                unitLong: "servings"
              }
            }
          },
          {
            id: 11265,
            aisle: "Produce",
            image: "portabello-mushrooms.jpg",
            consistency: "solid",
            name: "portobello mushroom caps",
            original: "4 portobello mushroom caps, stems removed",
            originalString: "4 portobello mushroom caps, stems removed",
            originalName: "portobello mushroom caps, stems removed",
            amount: 4.0,
            unit: "",
            meta: [],
            metaInformation: [],
            measures: {
              us: { amount: 4.0, unitShort: "", unitLong: "" },
              metric: { amount: 4.0, unitShort: "", unitLong: "" }
            }
          },
          {
            id: 10011282,
            aisle: "Produce",
            image: "red-onion.png",
            consistency: "solid",
            name: "red onion",
            original: "1 small red onion, thinly sliced",
            originalString: "1 small red onion, thinly sliced",
            originalName: "red onion, thinly sliced",
            amount: 1.0,
            unit: "small",
            meta: ["red", "thinly sliced"],
            metaInformation: ["red", "thinly sliced"],
            measures: {
              us: { amount: 1.0, unitShort: "small", unitLong: "small" },
              metric: { amount: 1.0, unitShort: "small", unitLong: "small" }
            }
          },
          {
            id: 1012047,
            aisle: "Spices and Seasonings",
            image: "salt.jpg",
            consistency: "solid",
            name: "sea salt",
            original: "Sea salt",
            originalString: "Sea salt",
            originalName: "Sea salt",
            amount: 4.0,
            unit: "servings",
            meta: [],
            metaInformation: [],
            measures: {
              us: { amount: 4.0, unitShort: "servings", unitLong: "servings" },
              metric: {
                amount: 4.0,
                unitShort: "servings",
                unitLong: "servings"
              }
            }
          }
        ],
        id: 602708,
        title:
          "Meatless Monday: Grilled Portobello Mushroom Burgers with Romesco and Arugula",
        readyInMinutes: 15,
        servings: 4,
        sourceUrl:
          "http://feedmephoebe.com/2014/06/grilled-portobello-mushroom-burger-recipe/",
        image: "https://spoonacular.com/recipeImages/602708-556x370.jpg",
        imageType: "jpg",
        summary:
          'The recipe Meatless Monday: Grilled Portobello Mushroom Burgers with Romesco and Arugula could satisfy your American craving in around <b>15 minutes</b>. This recipe makes 4 servings with <b>503 calories</b>, <b>11g of protein</b>, and <b>28g of fat</b> each. For <b>$3.25 per serving</b>, this recipe <b>covers 12%</b> of your daily requirements of vitamins and minerals. 589 people have tried and liked this recipe. It can be enjoyed any time, but it is especially good for <b>The Fourth Of July</b>. It is a good option if you\'re following a <b>gluten free and vegetarian</b> diet. A mixture of olive oil, sea salt, mild cheddar cheese, and a handful of other ingredients are all it takes to make this recipe so yummy. All things considered, we decided this recipe <b>deserves a spoonacular score of 61%</b>. This score is solid. Try <a href="https://spoonacular.com/recipes/meatless-mexican-grilled-portobello-mushroom-tacos-493311">Meatless Mexican: Grilled Portobello Mushroom Tacos</a>, <a href="https://spoonacular.com/recipes/gnocchi-with-fresh-tomato-and-portobello-meatless-monday-524409">Gnocchi with Fresh Tomato and Portobello (Meatless Monday)</a>, and <a href="https://spoonacular.com/recipes/grilled-portobello-mushroom-burgers-759451">Grilled Portobello Mushroom Burgers</a> for similar recipes.',
        cuisines: ["American"],
        dishTypes: ["side dish"],
        diets: ["gluten free", "lacto ovo vegetarian"],
        occasions: ["father's day", "4th of july", "summer"],
        winePairing: { pairedWines: [], pairingText: "", productMatches: [] },
        instructions:
          "Fire up a gass or charcoal grill or indoor grill pan. Brush the mushroom caps with olive oil and season with salt. Grill over medium-high heat until soft and nicely browned, about 5 to 8 minutes. Set aside under foil. Brush the onion slices with the oil and season with salt. Grill over medium-high heat until charred and soft, about 3 minutes. Set aside under foil.Grill the burger buns until toasty, about 2 minutes. When ready to serve, return the mushrooms to the grill over medium-low heat and top with the cheese slices. Cover with the hood so the cheese can melt. Alternatively, if cooking indoors, place the mushrooms on a baking sheet and melt cheese under the broiler for 1 minutes. Assemble the burgers: Slather the romesco sauce on both buns, top the bottom half with the mushroom cap, followed by the arugula. Sandwich together and serve with the remaining sauce on the side.",
        analyzedInstructions: [
          {
            name: "",
            steps: [
              {
                number: 1,
                step: "Fire up a gass or charcoal grill or indoor grill pan.",
                ingredients: [],
                equipment: [
                  { id: 404648, name: "grill pan", image: "grill-pan.jpg" },
                  { id: 404706, name: "grill", image: "grill.jpg" }
                ]
              },
              {
                number: 2,
                step:
                  "Brush the mushroom caps with olive oil and season with salt. Grill over medium-high heat until soft and nicely browned, about 5 to 8 minutes. Set aside under foil.",
                ingredients: [
                  { id: 4053, name: "olive oil", image: "olive-oil.jpg" },
                  { id: 2047, name: "salt", image: "salt.jpg" }
                ],
                equipment: [
                  { id: 404706, name: "grill", image: "grill.jpg" },
                  {
                    id: 404765,
                    name: "aluminum foil",
                    image: "aluminum-foil.png"
                  }
                ],
                length: { number: 5, unit: "minutes" }
              },
              {
                number: 3,
                step:
                  "Brush the onion slices with the oil and season with salt. Grill over medium-high heat until charred and soft, about 3 minutes. Set aside under foil.Grill the burger buns until toasty, about 2 minutes. When ready to serve, return the mushrooms to the grill over medium-low heat and top with the cheese slices. Cover with the hood so the cheese can melt. Alternatively, if cooking indoors, place the mushrooms on a baking sheet and melt cheese under the broiler for 1 minutes. Assemble the burgers: Slather the romesco sauce on both buns, top the bottom half with the mushroom cap, followed by the arugula. Sandwich together and serve with the remaining sauce on the side.",
                ingredients: [
                  {
                    id: 11959,
                    name: "arugula",
                    image: "arugula-or-rocket-salad.jpg"
                  },
                  { id: 1041009, name: "cheese", image: "cheddar-cheese.png" },
                  { id: 11282, name: "onion", image: "brown-onion.png" },
                  { id: 2047, name: "salt", image: "salt.jpg" }
                ],
                equipment: [
                  {
                    id: 404727,
                    name: "baking sheet",
                    image: "baking-sheet.jpg"
                  },
                  { id: 405914, name: "broiler", image: "oven.jpg" },
                  { id: 404706, name: "grill", image: "grill.jpg" },
                  {
                    id: 404765,
                    name: "aluminum foil",
                    image: "aluminum-foil.png"
                  }
                ],
                length: { number: 6, unit: "minutes" }
              }
            ]
          }
        ],
        originalId: null
      },
      recipe: undefined
    };
  },
  methods: {},
  computed: {
    formattedInstructions() {
      if (this.recipe && !this.recipe.instructions) {
        return [];
      } else {
        return this.recipe.instructions.split(/\s{3,}/g);
      }
    },
    computedDietTypes() {
        let dietTypes = [];
        if (this.recipe.vegetarian) {
            dietTypes.push('Vegetarian')
        };
        if (this.recipe.vegan) {
            dietTypes.push('Vegan')
        };
        if (this.recipe.glutenFree) {
            dietTypes.push('Gluten Free')
        };
        if (this.recipe.dairyFree) {
            dietTypes.push('Dairy Free')
        };
      return dietTypes;
    }
  },
  created() {
    /*
      solve:
      A cookie associated with a cross-site resource at http://spoonacular.com/ was set without the
       `SameSite` attribute. A future release of Chrome will only deliver cookies with cross-site requests
        if they are set with `SameSite=None` and `Secure`. You can review cookies in developer tools
         under Application>Storage>Cookies and see more details
          at https://www.chromestatus.com/feature/5088147346030592 
          and https://www.chromestatus.com/feature/5633521622188032.
      */
    let recipeId = this.$route.query.id;
    if (this.inDebug) {
      this.recipe = this.recipeDebug;
    } else {
      this.recipeInformation(recipeId)
        .then(resp => {
          if (resp.status === 200) {
            this.recipe = resp.data;
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
  }
};
</script>
<style scoped>
.recipe_single .headline {
  font-size: 32px !important;
  padding-top: 15px;
}

.preparation_meta {
  padding-top: 30px;
  padding-left: 15px;
  list-style: none;
  font-weight: bold;
  margin-right: 10px;
}

.recipe_meta {
  padding-top: 5px;
  padding-left: 15px;
  list-style: none;
  font-weight: bold;
  margin-right: 10px;
}

.recipe_content_wrap {
  padding: 10px 20px;
}

.recipe_content {
  padding-top: 15px;
  padding-left: 10px;
}

.list > li {
  height: 30px;
}

.icon {
  font-size: 16px;
}

.video-responsive {
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;
}

.video-responsive iframe {
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>
