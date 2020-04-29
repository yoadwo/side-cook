<template>
  <v-card class="mx-auto" max-width="300">
    <v-img class="white--text align-end" :src="imgSrc" contain>
      <v-card-title>{{cardTitle}}</v-card-title>
    </v-img>

    <v-card-text class="text--primary">
      <div>Used Ingredients: {{usedIngredientCount}}</div>

      <div>Missed Ingredients: {{missedIngredientCount}}</div>
    </v-card-text>

    <v-card-actions class="justify-center">
      <v-btn color="#df2827" text @click="pushRoute">THIS ONE LOOKS YUMMY!</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "RecipePreview",
  props: [
    "id",
    "imgSrc",
    "cardTitle",
    "usedIngredientCount",
    "missedIngredientCount"
  ],
  data: () => {
    return {};
  },
  methods: {
      pushRoute() {
          this.$emit('reroute', { id: this.id, title:this.cardTitle })
          this.$router.push({ path: 'recipe', query: { id: this.id } });
          // this.$router.push({ name: 'Recipe', params: { id: this.id, name: this.cardTitle } })
      }
  }
};
</script>