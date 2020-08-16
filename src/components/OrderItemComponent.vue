<template>
  <div class="row order-item">
    <div class="col">
      <button type="button" class="btn btn-primary" id="edit-item1" v-on:click="reduceQuant()">Reduce Quantity</button>
      <button type="button" class="btn btn-danger" v-on:click="removeItem()">-</button>
    </div>
    <div class="col">
      {{ getCartItem(itemId).id }}
    </div>
    <div class="col">
      {{ getCartItem(itemId).name }}
    </div>
    <div class="col">
      {{ getCartItem(itemId).quantity }}
    </div>
    <div class="col">
      A${{ printWithDecimals(getCartItem(itemId).price * getCartItem(itemId).quantity) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderItemComponent',
  data: function() {
    return {
      orderArraySize: this.$store.state.cart.length
    }
  },
  props: {
    itemId: String
  },
  methods: {
    /*
    Returns the object containing the cart item
     */
    getCartItem(itemIdFromCall) {
      for (let i = 0; i < this.$store.state.cart.length; i++) {
        if(this.$store.state.cart[i].id.toString() == itemIdFromCall) {
          return this.$store.state.cart[i]
        }
      }
    },
    /*
    Outputs number in correct format as currency
     */
    printWithDecimals(price) {
      return (Math.round(price * 100) / 100).toFixed(2)
    },
    /*
    Reduces the quantity of product ordered, if quantity reaches zero removes product from cart
     */
    reduceQuant() {
      for (let i = 0; i < this.$store.state.cart.length; i++) {
        if(this.$store.state.cart[i].id == this.itemId) {
          this.$store.state.cart[i].quantity = this.$store.state.cart[i].quantity - 1
          if(this.$store.state.cart[i].quantity == 0) {
            this.$store.state.cart.splice(i, 1)
            this.$store.state.cartTotal -= 1
          }
        }
      }
    },
    /*
    Removes product from cart
     */
    removeItem() {
      for (let i = 0; i < this.$store.state.cart.length; i++) {
        if(this.$store.state.cart[i].id == this.itemId) {
          this.$store.state.cartTotal -= this.$store.state.cart[i].quantity
          this.$store.state.cart.splice(i, 1)
        }
      }
    }
  }
}
</script>
