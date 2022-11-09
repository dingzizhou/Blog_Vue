<template>
  <v-app id="app">
    <!-- 导航栏 -->
    <TopNavBar/>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import TopNavBar from "./components/layout/TopNavBar"
export default {
  name: "App",
  components: {
    TopNavBar
  },
  data: function () {
    return {};
  },
};
</script>

<style scoped>
#app {
  /* background:url(./assets/background_home.png); */
  background-size: cover;
}
</style>