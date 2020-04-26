<template>
  <div ref="recipe_single" class="recipe_single">
    <!-- <div v-if="recipe">
    <v-breadcrumbs :items="breadcrumbsWithCurrent">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    </div> -->
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
              <ul class="recipe_meta">
                <li>
                  <p>
                    <strong>PREPARATION</strong>
                    {{recipe.readyInMinutes}} {{ recipe.readyInMinutes > 1 ? 'minutes' : 'minute' }}
                  </p>
                </li>
                <!-- <li>
                  <p>
                    <strong>COOK TIME</strong>
                    {{recipe.metadata.cook_time}} {{ recipe.metadata.cook_time > 1 ? 'minutes' : 'minute' }}
                  </p>
                </li>-->
                <li>
                  <p>
                    <strong>SERVINGS</strong>
                    {{recipe.servings}} {{ recipe.servings > 1 ? 'persons' : 'person' }}
                  </p>
                </li>
                <li v-if="recipe.dishTypes">
                  <p>
                    <strong>Dish Types</strong>
                    <v-chip
                      class="amber dark--text"
                      v-for="(type, index) in recipe.dishTypes"
                      :key="index"
                    >{{type}}</v-chip>
                  </p>
                </li>
              </ul>
            </v-flex>
          </v-layout>
          <p class="mt-3"></p>
          <!-- <v-layout row wrap class="recipe_content_wrap">
            <v-flex xs12 md8 offset-md2>
              <div class="video-responsive">
                <iframe
                  width="560"
                  height="315"
                  :src="'https://www.youtube.com/embed/'+recipe.metadata.youtube_id"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </div>
            </v-flex>
          </v-layout>-->
          <p class="mt-5"></p>
          <v-card class="white">
            <v-layout row wrap class="recipe_content_wrap">
              <v-flex xs12 md6>
                <h1 class="headline mb-0">Preparation:</h1>
                <!-- <p v-html="recipe.instructions" class="recipe_content"></p> -->
                <p v-for="(p, index) in formattedInstructions" :key="index">{{p}}</p>
              </v-flex>
              <v-flex xs12 md6 order-md2>
                <h1 class="headline mb-0">Ingredients:</h1>
                <v-list avatar>
                  <v-list-item
                    dense
                    v-for="(item, index) in recipe.extendedIngredients"
                    :key="index"
                  >
                    <v-list-item-icon>
                      <v-icon class="amber--text text--darken-2">fa-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{item.originalString}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "Recipe",
  data: () => {
    return {
        inDebug: true,
      recipeDebug: {
        vegetarian: false,
        vegan: false,
        glutenFree: true,
        dairyFree: true,
        veryHealthy: false,
        cheap: false,
        veryPopular: false,
        sustainable: false,
        weightWatcherSmartPoints: 21,
        gaps: "no",
        lowFodmap: false,
        ketogenic: false,
        whole30: false,
        servings: 10,
        sourceUrl:
          "http://www.epicurious.com/recipes/food/views/Char-Grilled-Beef-Tenderloin-with-Three-Herb-Chimichurri-235342",
        spoonacularSourceUrl:
          "https://spoonacular.com/char-grilled-beef-tenderloin-with-three-herb-chimichurri-156992",
        aggregateLikes: 0,
        creditText: "Epicurious",
        sourceName: "Epicurious",
        extendedIngredients: [
          {
            id: 1022009,
            aisle: "Ethnic Foods",
            image:
              "https://spoonacular.com/cdn/ingredients_100x100/chili-powder.jpg",
            name: "ancho chile powder",
            amount: 1.5,
            unit: "teaspoons",
            unitShort: "t",
            unitLong: "teaspoons",
            originalString:
              "1 1/2 teaspoons chipotle chile powder or ancho chile powder",
            metaInformation: []
          },
          {
            id: 13926,
            aisle: "Meat",
            image:
              "https://spoonacular.com/cdn/ingredients_100x100/beef-tenderloin.jpg",
            name: "beef tenderloin",
            amount: 3.5,
            unit: "pound",
            unitShort: "lb",
            unitLong: "pounds",
            originalString: "1 3 1/2-pound beef tenderloin",
            metaInformation: []
          },
          {
            id: 1002030,
            aisle: "Spices and Seasonings",
            image: "https://spoonacular.com/cdn/ingredients_100x100/pepper.jpg",
            name: "black pepper",
            amount: 0.5,
            unit: "teaspoon",
            unitShort: "t",
            unitLong: "teaspoons",
            originalString: "1/2 teaspoon freshly ground black pepper",
            metaInformation: ["black", "freshly ground"]
          },
          {
            id: 1082047,
            aisle: "Spices and Seasonings",
            image: "https://spoonacular.com/cdn/ingredients_100x100/salt.jpg",
            name: "coarse kosher salt",
            amount: 1.0,
            unit: "tablespoon",
            unitShort: "T",
            unitLong: "tablespoon",
            originalString: "1 tablespoon coarse kosher salt",
            metaInformation: []
          },
          {
            id: 10019334,
            aisle: "Baking",
            image:
              "https://spoonacular.com/cdn/ingredients_100x100/brown-sugar-dark.jpg",
            name: "dark brown sugar",
            amount: 2.0,
            unit: "tablespoons",
            unitShort: "T",
            unitLong: "tablespoons",
            originalString: "2 tablespoons dark brown sugar",
            metaInformation: ["dark"]
          },
          {
            id: 11165,
            aisle: "Produce",
            image:
              "https://spoonacular.com/cdn/ingredients_100x100/cilantro.png",
            name: "fresh cilantro",
            amount: 2.0,
            unit: "cups",
            unitShort: "c",
            unitLong: "cups",
            originalString: "2 cups (packed) stemmed fresh cilantro",
            metaInformation: ["fresh", "packed", "stemmed", "()"]
          },
          {
            id: 2064,
            aisle: "Produce",
            image: "https://spoonacular.com/cdn/ingredients_100x100/mint.jpg",
            name: "fresh mint",
            amount: 1.0,
            unit: "cup",
            unitShort: "c",
            unitLong: "cup",
            originalString: "1 cup (packed) stemmed fresh mint",
            metaInformation: ["fresh", "packed", "stemmed", "()"]
          },
          {
            id: 11297,
            aisle: "Produce",
            image:
              "https://spoonacular.com/cdn/ingredients_100x100/parsley.jpg",
            name: "fresh parsley",
            amount: 3.0,
            unit: "cups",
            unitShort: "c",
            unitLong: "cups",
            originalString: "3 cups (packed) stemmed fresh parsley",
            metaInformation: ["fresh", "packed", "stemmed", "()"]
          },
          {
            id: 11215,
            aisle: "Produce",
            image: "https://spoonacular.com/cdn/ingredients_100x100/garlic.jpg",
            name: "garlic cloves",
            amount: 3.0,
            unit: "",
            unitShort: "",
            unitLong: "",
            originalString: "3 garlic cloves, peeled",
            metaInformation: ["peeled"]
          },
          {
            id: 1002030,
            aisle: "Spices and Seasonings",
            image: "https://spoonacular.com/cdn/ingredients_100x100/pepper.jpg",
            name: "ground pepper",
            amount: 1.0,
            unit: "teaspoon",
            unitShort: "t",
            unitLong: "teaspoon",
            originalString: "1 teaspoon ground black pepper",
            metaInformation: ["black"]
          },
          {
            id: 9152,
            aisle: "Produce",
            image:
              "https://spoonacular.com/cdn/ingredients_100x100/lemon-juice.jpg",
            name: "lemon juice",
            amount: 3.0,
            unit: "tablespoons",
            unitShort: "T",
            unitLong: "tablespoons",
            originalString: "3 tablespoons fresh lemon juice",
            metaInformation: ["fresh"]
          },
          {
            id: 4053,
            aisle: "Oil, Vinegar, Salad Dressing",
            image:
              "https://spoonacular.com/cdn/ingredients_100x100/olive-oil.jpg",
            name: "olive oil",
            amount: 0.75,
            unit: "cup",
            unitShort: "c",
            unitLong: "cups",
            originalString: "3/4 cup olive oil",
            metaInformation: []
          },
          {
            id: 4053,
            aisle: "Oil, Vinegar, Salad Dressing",
            image:
              "https://spoonacular.com/cdn/ingredients_100x100/olive-oil.jpg",
            name: "olive oil",
            amount: 2.0,
            unit: "tablespoons",
            unitShort: "T",
            unitLong: "tablespoons",
            originalString: "2 tablespoons olive oil",
            metaInformation: []
          },
          {
            id: 11821,
            aisle: "Produce",
            image:
              "https://spoonacular.com/cdn/ingredients_100x100/red-bell-pepper.png",
            name: "red pepper",
            amount: 0.5,
            unit: "teaspoon",
            unitShort: "t",
            unitLong: "teaspoons",
            originalString: "1/2 teaspoon dried crushed red pepper",
            metaInformation: ["dried", "red", "crushed"]
          },
          {
            id: 1022068,
            aisle: "Oil, Vinegar, Salad Dressing",
            image:
              "https://spoonacular.com/cdn/ingredients_100x100/red-wine-vinegar.jpg",
            name: "red wine vinegar",
            amount: 3.0,
            unit: "tablespoons",
            unitShort: "T",
            unitLong: "tablespoons",
            originalString:
              "3 tablespoons Sherry wine vinegar or red wine vinegar",
            metaInformation: ["red"]
          },
          {
            id: 1012047,
            aisle: "Spices and Seasonings",
            image: "https://spoonacular.com/cdn/ingredients_100x100/salt.jpg",
            name: "sea salt",
            amount: 1.0,
            unit: "teaspoon",
            unitShort: "t",
            unitLong: "teaspoon",
            originalString: "1 teaspoon fine sea salt",
            metaInformation: ["fine"]
          },
          {
            id: 11677,
            aisle: "Produce",
            image:
              "https://spoonacular.com/cdn/ingredients_100x100/shallots.jpg",
            name: "shallots",
            amount: 2.0,
            unit: "",
            unitShort: "",
            unitLong: "",
            originalString: "2 medium shallots, peeled, quartered",
            metaInformation: ["medium", "peeled", "quartered"]
          },
          {
            id: 1002028,
            aisle: "Spices and Seasonings",
            image:
              "https://spoonacular.com/cdn/ingredients_100x100/paprika.jpg",
            name: "sweet paprika",
            amount: 1.0,
            unit: "tablespoon",
            unitShort: "T",
            unitLong: "tablespoon",
            originalString: "1 tablespoon sweet smoked paprika*",
            metaInformation: ["smoked"]
          }
        ],
        id: 156992,
        title: "Char-Grilled Beef Tenderloin with Three-Herb Chimichurri",
        readyInMinutes: 45,
        image:
          "https://spoonacular.com/recipeImages/char-grilled-beef-tenderloin-with-three-herb-chimichurri-156992.jpg",
        imageType: "jpg",
        instructions:
          "For spice rub:                                        Combine all ingredients in small bowl.                                                                            Do ahead: Can be made 2 days ahead. Store airtight at room temperature.                                    For chimichurri sauce:                                        Combine first 8 ingredients in blender; blend until almost smooth. Add 1/4 of parsley, 1/4 of cilantro, and 1/4 of mint; blend until incorporated. Add remaining herbs in 3 more additions, pureeing until almost smooth after each addition.                                                                            Do ahead: Can be made 3 hours ahead. Cover; chill.                                    For beef tenderloin:                                        Let beef stand at room temperature 1 hour.                                                                            Prepare barbecue (high heat). Pat beef dry with paper towels; brush with oil. Sprinkle all over with spice rub, using all of mixture (coating will be thick). Place beef on grill; sear 2 minutes on each side. Reduce heat to medium-high. Grill uncovered until instant-read thermometer inserted into thickest part of beef registers 130F for medium-rare, moving beef to cooler part of grill as needed to prevent burning, and turning occasionally, about 40 minutes. Transfer to platter; cover loosely with foil and let rest 15 minutes. Thinly slice beef crosswise. Serve with chimichurri sauce.                                                                            *Available at specialty foods stores and from tienda.com."
      },
      recipe: undefined
    };
  },
  methods: {},
  computed: {
    formattedInstructions() {
      if (this.recipe.instructions.length == 0) {
        return [];
      } else {
        return this.recipe.instructions.split(/\s{3,}/g);
      }
    },
    breadcrumbsWithCurrent() {
        return  [
        {  text: 'Home',disabled: false,href: '/'},
        { text: this.recipe.title || "", disabled: true, href: 'recipe?id=' + this.recipe.id}
      ]
    }
  },
  created() {
      debugger;
      let recipeId = this.$route.query.id;
      if (this.inDebug) {
          this.recipe = this.recipeDebug
      } else {
        // consume api
      }
  }
};
</script>
<style scoped>
.recipe_single .headline {
  font-size: 32px !important;
  padding-top: 15px;
}

.recipe_meta {
  padding-top: 30px;
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
