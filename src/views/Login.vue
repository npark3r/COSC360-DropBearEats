<template>
  <div class="login-content">
    <form class="login-form">
      <div class="row">
        <div class="col-4">
        </div>
        <div class="col-4">
          <p id="error-area"></p>
          <p id="success-area"></p>
        </div>
        <div class="col-4">
        </div>
      </div>
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4">
          <label for="username">Username:</label>
          <input type="text" class="form-control item" name="username" id="username"><br>
          <label for="pass">Password:</label>
          <input type="text" class="form-control item" name="pass" id="pass"><br>
        </div>
        <div class="col-4"></div>
      </div>
      <div class="row">
        <div class="col-4">
        </div>
        <div class="col-4">
          <button type="button" class="btn btn-primary" id="login" v-on:click="verifyUser()">Login</button>
          <button type="button" class="btn btn-primary" id="sign_up">Sign Up</button>
        </div>
        <div class="col-4">
        </div>
      </div>

    </form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  methods: {
    /*
    Verify user login details and print success or error messages
     */
    verifyUser() {
      document.getElementById('error-area').innerText = ""
      let usernameProvided = document.getElementById('username').value
      let passwordProvided = document.getElementById('pass').value
      let foundUser = false
      let passCorrect = false
      for (let i = 0; i < this.$store.state.registeredUsers.length; i++) {
        if(this.$store.state.registeredUsers[i].regUserName == usernameProvided) {
          foundUser = true
          if(this.$store.state.registeredUsers[i].password == passwordProvided) {
            passCorrect = true
            this.$store.state.user.userName = usernameProvided
            this.$store.state.user.fullName = this.$store.state.registeredUsers[i].storedName
            this.$store.state.user.address = this.$store.state.registeredUsers[i].storedAddr
            this.$store.state.user.contactNumber = this.$store.state.registeredUsers[i].storedPhone
            this.$store.state.loggedIn = true
            if(usernameProvided == "admin") {
              this.$store.state.user.adminRights = true
            }
          }
        }
      }
      if(!foundUser) {
        document.getElementById('error-area').innerText = "Could not find user"
      }
      if(foundUser && !passCorrect) {
        document.getElementById('error-area').innerText = "Incorrect Password"
      } else if (foundUser && passCorrect) {
        document.getElementById('success-area').innerText = "Success! Logged In"
      }
    }
  }
}
</script>