<template>
  <div class="container">
    <div class="row">
      <aside class="col-2 sidebar">
        <div class="form">
          <button type="button" class="btn btn-primary" id="clear_cart" v-on:click="clearCart()">Clear Cart</button>
        </div>
      </aside>
      <div class="col-10 content" id="cart-content">
        <div class="row list_header">
          <div class="col"></div>
          <div class="col">
            Item ID
          </div>
          <div class="col">
            Name
          </div>
          <div class="col">
            Quantity
          </div>
          <div class="col">
            Price
          </div>
        </div><br>
        <div v-if="cartSize > 0" v-for="orderitem in cart">
          <order-item-component :itemId="orderitem.id.toString()"></order-item-component>
        </div>
        <div class="row" id="line"></div><br>
        <div class="row order-item">
            <div class="col"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col">
              TOTAL:
            </div>
            <div id="cart_total" class="col">
              A${{ displayCartTotalPrice() }}
            </div>
        </div>
        <div class="row order-item">
          <div class="col">

          </div>
          <div class="col">

          </div>
          <div class="col">

          </div>
          <div class="col">

          </div>
          <div class="col">
            <router-link v-if="$store.state.cartTotal > 0" to="/checkout" tag="button" class="btn btn-primary">CHECKOUT</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import CartSidebarComponent from "../components/CartSidebarComponent.vue";
import OrderItemComponent from "../components/OrderItemComponent.vue";
export default {
  name: 'Cart',
  data: function() {
    return {
      cartSize: this.$store.state.cart.length,
      cart: this.$store.state.cart
    }
  },
  methods: {
    /*
    Returns the total cart price
     */
    displayCartTotalPrice() {
      let total = 0
      for (let i = 0; i < this.$store.state.cart.length; i++) {
        total += this.$store.state.cart[i].price * this.$store.state.cart[i].quantity
      }
      return (Math.round(total * 100) / 100).toFixed(2)
    },
    /*
    Clears all cart items
     */
    clearCart() {
      this.$store.state.cart = []
      this.$store.state.cartTotal = 0
      this.cartSize = 0
    }
},
  components: {OrderItemComponent, CartSidebarComponent}
}
</script>
