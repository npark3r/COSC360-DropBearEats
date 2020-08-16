<template>
  <div class="content">
    <div class="row">
      <div class="col">
        <p class="detail-heading">Username:</p>
        <p>{{ $store.state.user.userName }}</p>
        <p class="detail-heading">Full Name:</p>
        <p>{{ getFullname }}</p>
        <p class="detail-heading">Address:</p>
        <p>{{ getAddress }}</p>
        <p class="detail-heading">Contact Number:</p>
        <p>{{ getPhone }}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Account',
  data: function() {
    return {
    }
  },
  computed: {
    /*
    Returns the user's full name
     */
    getFullname : function() {
      for (let i = 0; i < this.$store.state.registeredUsers.length; i++) {
        if (this.$store.state.registeredUsers[i].regUserName == this.$store.state.user.userName) {
          return this.$store.state.registeredUsers[i].storedName
        }
      }
    },
    /*
    Returns the user's address
     */
    getAddress : function() {
      for (let i = 0; i < this.$store.state.registeredUsers.length; i++) {
        if (this.$store.state.registeredUsers[i].regUserName == this.$store.state.user.userName) {
          return this.$store.state.registeredUsers[i].storedAddr
        }
      }
    },
    /*
    Returns the user's phone number
     */
    getPhone : function() {
      for (let i = 0; i < this.$store.state.registeredUsers.length; i++) {
        if (this.$store.state.registeredUsers[i].regUserName == this.$store.state.user.userName) {
          return this.$store.state.registeredUsers[i].storedPhone
        }
      }
    }
  }
}
</script>