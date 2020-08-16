<template>
  <div>
    <div class="container" id="container">
      <div class="row">
        <aside class="col-2 sidebar">
          <div class="form">
            <router-link v-if="$store.state.cartTotal > 0" to="/cart" tag="button" class="btn btn-primary">Back to Cart</router-link>
          </div>
        </aside>
        <div class="col-10 content" id="content">
          <div class="row">
            <form id="card_form">
              <label for="name">Full Name:</label>
              <p id="warning-details">All details must be provided.</p>
              <input type="text" class="form-control item" name="name" id="name" :value="$store.state.user.fullName"><br>
              <label for="addr">Address:</label>
              <input type="text" class="form-control item" name="addr" id="addr" :value="$store.state.user.address"><br>
              <label for="phone">Contact Number:</label>
              <input type="phone" class="form-control item" name="phone" id="phone" :value="$store.state.user.contactNumber"><br>
              <input type="radio" id="save" name="save" value="save">
              <label for="save">Save Details For Future Payments</label><br>
              <label for="card_type">Choose card type</label>
              <select name="card_type" id="card_type">
                <option value="master">Master Card</option>
                <option value="visa">Visa</option>
                <option value="american">American Express</option>
              </select><br>
              <label for="card_no">Card Number:</label>
              <p id="warning-card">Invalid Card Number length: Visa + MC -16, AE - 15</p>
              <input type="text" class="form-control item" name="card_no" id="card_no">
              <label for="expiry">Expiry:</label>
              <p id="warning-expiry">Expiry date is invalid.</p>
              <input type="date" class="form-control item" name="expiry" id="expiry" :value="today" :min="today">
              <label for="cvc">CVC:</label>
              <p id="warning-cvc">CVC must be three numbers</p>
              <input type="text" class="form-control item" name="cvc" id="cvc">
            </form>
          </div>
          <div class="row">
            <div class="col-8"></div>
            <div class="col-4">
              <button type="button" class="btn btn-danger" id="pay_with_cash" v-on:click="cash()">Pay With Cash</button>
              <button type="button" class="btn btn-primary" id="confirm" v-on:click="confirm()">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="modal-payment-success" hide-footer title="Payment Successful">
      <p class="my-4">To view order and its status go to your order history</p>
      <b-button class="mt-3" block v-on:click="close()">Continue</b-button>
    </b-modal>
    <b-modal id="modal-cash" hide-footer title="Order Confirmed">
      <p class="my-4">Driver will collect payment. To view order and its status go to your order history</p>
      <b-button class="mt-3" block v-on:click="close()">Continue</b-button>
    </b-modal>
  </div>
</template>

<script>

import router from "../router";

export default {
  name: 'Checkout',
  data: function() {
    return {
    }
  },
  methods: {
    /*
    Function to prevent default form submission and validate all inputs
     */
    confirm() {
      let warningCard = document.getElementById('warning-card')
      let warningExpiry = document.getElementById('warning-expiry')
      let warningCvc = document.getElementById('warning-cvc')
      let warningDetails = document.getElementById('warning-details')
      warningCard.style.display = "none";
      warningExpiry.style.display = "none";
      warningCvc.style.display = "none";
      let name = document.getElementById('name').value
      let addr = document.getElementById('addr').value
      let phone = document.getElementById('phone').value
      let cardNo = document.getElementById('card_no').value
      let expiryDate = document.getElementById('expiry').value
      let cvc = document.getElementById('cvc').value
      let cardTypeSelect = document.getElementById('card_type')
      let cardType = cardTypeSelect.options[cardTypeSelect.selectedIndex].value;
      let paymentSuccessful = true
      if(document.getElementById('save').checked) {
        for (let i = 0; i < this.$store.state.registeredUsers.length; i++) {
          if (this.$store.state.registeredUsers[i].regUserName == this.$store.state.user.userName) {
            this.$store.state.registeredUsers[i].storedName = document.getElementById('name').value
            this.$store.state.registeredUsers[i].storedAddr = document.getElementById('addr').value
            this.$store.state.registeredUsers[i].storedPhone = document.getElementById('phone').value
            this.$store.state.user.fullName = document.getElementById('name').value
            this.$store.state.user.address = document.getElementById('addr').value
            this.$store.state.user.contactNumber = document.getElementById('phone').value
          }
        }
      }
      if(name.length == 0 || addr.length == 0 || phone.length == 0) {
        warningDetails.style.display = "block"
        paymentSuccessful = false
      } else if(cardNo.length == 0) {
        warningCard.style.display = "block"
        paymentSuccessful = false
      } else if(cvc.length == 0) {
        warningCvc.style.display = "block"
        paymentSuccessful = false
      } else if(!isNaN(cardNo.toNumber)) {
        warningCard.style.display = "block"
        paymentSuccessful = false
      } else if ((cardType == 'visa' || cardType == 'master') && cardNo.length != 16) {
        warningCard.style.display = "block"
        paymentSuccessful = false
      } else if (cardType == 'american' && cardNo.length != 15) {
        warningCard.style.display = "block"
        paymentSuccessful = false
      } else if (expiryDate < this.today) {
        warningExpiry.style.display = 'block';
        paymentSuccessful = false
      } else if (!isNaN(cvc.toNumber) || cvc.length != 3) {
        warningCvc.style.display = 'block';
        paymentSuccessful = false
      }
       // hardcode working payment without real implem
      if (paymentSuccessful) {
        document.getElementById('container').style.display = "none"
        this.$bvModal.show('modal-payment-success')
        this.sendOrder()
      }
    },
    /*
    Cash payment prints alternate message without validating
     */
    cash() {
      let warningDetails = document.getElementById('warning-details')
      let paymentSuccessful = true
      let name = document.getElementById('name').value
      let addr = document.getElementById('addr').value
      let phone = document.getElementById('phone').value
      if(name.length == 0 || addr.length == 0 || phone.length == 0) {
        warningDetails.style.display = "block"
        paymentSuccessful = false
      }
      if(document.getElementById('save').checked) {
        for (let i = 0; i < this.$store.state.registeredUsers.length; i++) {
          if (this.$store.state.registeredUsers[i].regUserName == this.$store.state.user.userName) {
            this.$store.state.registeredUsers[i].storedName = document.getElementById('name').value
            this.$store.state.registeredUsers[i].storedAddr = document.getElementById('addr').value
            this.$store.state.registeredUsers[i].storedPhone = document.getElementById('phone').value
          }
        }
      }
      if (paymentSuccessful) {
        this.$bvModal.show('modal-cash')
        this.sendOrder()
      }
    },
    /*
    Close cash payment modal
     */
    close() {
      this.$bvModal.hide('modal-payment-success')
      this.$bvModal.hide('modal-cash')
      router.push({ path: '/user' })
    },
    /*
    Send cart order to orders array and clear cart
     */
    sendOrder() {
      let order = {
        customer: this.$store.state.user.userName,
        orderTotal: this.displayCartTotalPrice(),
        date: this.today,
        updated: true,
        orderedItems: this.$store.state.cart
      }
      this.$store.commit('addToOrders',order)
      this.$store.state.cart = []
      this.$store.state.cartTotal = 0
    },
    displayCartTotalPrice() {
      let total = 0
      for (let i = 0; i < this.$store.state.cart.length; i++) {
        total += this.$store.state.cart[i].price * this.$store.state.cart[i].quantity
      }
      return (Math.round(total * 100) / 100).toFixed(2)
    }
  },
  computed: {
    /*
    Compute today's date
     */
    today() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd;
      return today
    }
  }
}
</script>