<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <router-link to="/account"><h2>Account Details</h2></router-link><br>
        <router-link to="/order-history" @click.native="setUpdated"><h2>View Order History <p class="notification" v-if="isThereAnUpdate == true">UPDATE!</p> </h2></router-link><br>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'User',
  methods: {
    /*
    Removes update flag to hide notification text
     */
    setUpdated() {
      for (let i = 0; i < this.$store.state.orders.length; i++) {
        if (this.$store.state.orders[i].updated == true) {
          this.$store.state.orders[i].updated = false
        }
      }
    }
  },
  computed: {
    /*
    Checks if there is an update
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