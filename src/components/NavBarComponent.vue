<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#"><img src="../assets/img/logo1.png" alt="">
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <router-link  to="/" class="nav-link">HOME</router-link>
          <router-link id="browse-link" v-if="$store.state.loggedIn == true" to="/browse" class="nav-link">BROWSE</router-link>
          <router-link v-if="$store.state.loggedIn == true" to="/user" class="nav-link">PROFILE <p align="center" class="notification" v-if="isThereAnUpdate == true">UPDATE!</p></router-link>
          <router-link id="cart-link" v-if="$store.state.loggedIn == true" to="/cart" class="nav-link">
            <p v-if="$store.state.cartTotal > 0"> CART ({{ $store.state.cartTotal }})</p>
            <p v-else>CART</p>
          </router-link>
          <router-link id="login-link" v-else to="/login" class="nav-link">LOGIN</router-link>
          <router-link v-if="$store.state.user.adminRights == true" to="/dashboard" class="nav-link">ADMIN DASHBOARD</router-link>
          <a v-if="$store.state.loggedIn == true" v-on:click="logOut()" class="nav-link" >LOGOUT</a>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import router from "../router";

export default {
  name: 'NavBarComponent',
  props: {
    id: String
  },
  methods: {
    /*
    log user out and return to home directory
     */
    logOut() {
      this.$store.state.loggedIn = false
      this.$store.state.user.adminRights = false
      this.$store.state.user.fullName = ""
      this.$store.state.user.address = ""
      this.$store.state.user.userName = ""
      this.$store.state.user.contactNumber = ""
      this.$store.state.cart = []
      this.$store.state.cartTotal = 0
      router.push({ path: '/' })
    }
  },
  computed: {
    /*
    Checks if any order has and update to print notification text
     */
    isThereAnUpdate() {
      for (let i = 0; i < this.$store.state.orders.length; i++) {
        if (this.$store.state.orders[i].updated == true) {
          return true
        }
      }
      return false
    }
  }
}
</script>