<template>
  <div class="container" >
    <nav-bar-component></nav-bar-component>
    <div :class="currentRouteName">
      <router-view/>
    </div>
  </div>
</template>

<script>

import NavBarComponent from "./components/NavBarComponent.vue";
export default {
  components: {NavBarComponent},
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  }
}
</script>