<template>
  <v-app>
    <!-- <Breadcrumbs/> -->
    <!-- <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="side-cook Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/images/side-cook-logo.png')"
          transition="scale-transition"
          width="40"
        />

        <v-btn color="primary" dark>Side-Cook</v-btn>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar> -->

    <v-content>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import Breadcrumbs from './components/Breadcrumbs';

export default {
  name: 'App',

  components: {
    Breadcrumbs,
  },

  data: () => ({
    //
  }),
};
</script>
