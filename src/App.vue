<template>
  <nav>
    <!-- use the router-link component for navigation. -->
    <!-- specify the link by passing the `to` prop. -->
    <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
    <router-link to="/">Home </router-link>
    <router-link to="/sessions"> Sessions </router-link>
    <router-link to="/tickets"> Tickets </router-link>
    <router-link to="/poster"> Films </router-link>
  </nav>
  <!-- route outlet -->
  <!-- component matched by the route will render here -->
  <router-view></router-view>
</template>
<script>
import { RouterLink, RouterView } from "vue-router";
export default {
  components: {
    RouterLink,
    RouterView,
  },
  data() {
    return {};
  },
};
</script>
<style></style>
