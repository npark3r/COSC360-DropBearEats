<template>
  <div>
    <div class="inside-product">
      <img :src="getImgUrl(prodId)" alt="">
      <p class="prod-name">{{ this.$store.state.products[prodId].name }}</p>
      <p class="price-tag">A${{ printWithDecimals(this.$store.state.products[prodId].price) }}</p>
      <button v-on:click="showModal($store.state.products[prodId].name)" type="button" class="add_to_cart">More Info</button>
      <button :id="'add_to_cart_' + prodId" v-on:click="addToCart(prodId)" type="button" class="add_to_cart">Add to Cart</button>
      <br>
    </div>
    <b-modal size="xl"  :id="$store.state.products[prodId].name" hide-footer :title="$store.state.products[prodId].name ">
      <p class="my-4 detail-heading">Description</p>
      <p> {{ this.$store.state.products[prodId].descp }}</p>
      <b-button class="mt-3" block v-on:click="close($store.state.products[prodId].name)">Close</b-button>
    </b-modal>
  </div>
</template>

<script>
import router from "../router";

export default {
  name: 'ProductComponent',
  props: {
    prodId: String
  },
  methods: {
    /*
    Calls method in store to add this item to cart
     */
    addToCart(id) {
      let pay = this.$store.state.products[id]
      this.$store.commit("addToCart", { pay })
    },
    /*
    Returns the correct image path/URL
     */
    getImgUrl(pet) {
      let images = require.context('../assets/img/', false, /\.jpg$/)
      return images('./' + pet + ".jpg")
    },
    /*
    Outputs number correctly formatted as currency
     */
    printWithDecimals(price) {
      return (Math.round(price * 100) / 100).toFixed(2)
    },
    /*
    Close modal
     */
    close(prodIdGiven) {
      this.$bvModal.hide(prodIdGiven)
    },
    /*
    Show modal
     */
    showModal(prodIdGiven) {
      this.$bvModal.show(prodIdGiven)
    }
  }
}
</script>