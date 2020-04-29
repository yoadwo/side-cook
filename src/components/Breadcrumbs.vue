<template>
  <v-breadcrumbs :items="breads" v-if="breads.length > 1">
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>
<script>
export default {
  name: "Breadcrumbs",
  props: ["id", "name"],
  data: () => {
      return {
          breads: [{ text: "Home", disabled: false, to: "/" }]
      }
  },
  computed: {
    breadcrumbsWithCurrent() {
        // { text: this.title || "", disabled: true, href: "recipe?id=" + this.id }
        return base;
    }
  },
  watch: {
      '$route' () {
          // todo: finish this
          let newRoute = { text: this.$route.params.name || "", disabled: true };
          if (this.breads.length == 1) {
              this.breads.push(newRoute);
          } else {
              this.breads = [this.breads[0]];
          }
      }
  }
};
</script>