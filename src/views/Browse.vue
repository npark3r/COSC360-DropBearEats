<template>
  <div class="container">
    <div class="row">
      <aside class="col-2 sidebar">
        <div class="form">
          <form class="sidebar-form">
            <h3>Cuisine</h3>
            <input type="radio" id="italian" name="cuisine" value="italian">
            <label for="italian">Italian</label><br>
            <input type="radio" id="french" name="cuisine" value="french">
            <label for="french">French</label><br>
            <input type="radio" id="indian" name="cuisine" value="indian">
            <label for="indian">Indian</label><br>
          </form><br>
          <form class="sidebar-form">
            <h3>Restaurant</h3>
            <input type="radio" id="ale-pizza" name="rest" value="ale">
            <label for="ale-pizza">Alejandro's Pizza</label><br>
            <input type="radio" id="posdeserts" name="rest" value="pos">
            <label for="posdeserts">Po's Deserts</label><br>
            <input type="radio" id="frankforeign" name="rest" value="frank">
            <label for="frankforeign">Frank's Foreign Food</label><br>
          </form><br>
        </div>
        <button type="button" class="btn btn-primary" id="filter_products" v-on:click="filterProducts()">Filter</button>
      </aside>
      <div class="col-10 content" id="product-area">
        <div class="row" v-for="i in Math.ceil(prodArray.length / 4)">
          <div class="col-3 justify-content-center food-item text-center" v-for="prod in prodArray.slice((i - 1) * 4, i * 4)">
            <product-component :prodId="prod.id.toString()"></product-component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductComponent from "../components/ProductComponent.vue";
export default {
  name: 'Browse',
  data: function() {
    return {
      prodArray: this.$store.state.products,
      arraySize: 8,
      image1: ''
    }
  },
  components: {
    ProductComponent
  },
  methods: {
    /*
    Filters the products displayed based on the criteria
     */
    filterProducts() {
      this.arraySize = 0;
      this.prodArray = []
      let cuisineRadios = document.getElementsByName("cuisine")
      let cuisineChecked = false
      let cuisine
      for (let i = 0; i < cuisineRadios.length; i++) {
        if(cuisineRadios[i].checked) {
          cuisine = cuisineRadios[i].value
          cuisineChecked = true
        }
      }
      let restaurantRadios = document.getElementsByName("rest")
      let restaurantChecked = false
      let restaurant
      for (let i = 0; i < restaurantRadios.length; i++) {
        if(restaurantRadios[i].checked) {
          restaurant = restaurantRadios[i].value
          restaurantChecked = true
        }
      }
      if (cuisineChecked == true && restaurantChecked == true) {
        for (let i = 0; i < this.$store.state.products.length; i++) {
          if (this.$store.state.products[i].cuisine == cuisine && this.$store.state.products[i].restaurant == restaurant) {
            this.prodArray.push(this.$store.state.products[i])
            this.arraySize++
          }
        }
      } else if (cuisineChecked == true) {
        for (let i = 0; i < this.$store.state.products.length; i++) {
          if (this.$store.state.products[i].cuisine == cuisine) {
            this.prodArray.push(this.$store.state.products[i])
            this.arraySize++
          }
        }
      } else if (restaurantChecked == true) {
        for (let i = 0; i < this.$store.state.products.length; i++) {
          if (this.$store.state.products[i].restaurant == restaurant) {
            this.prodArray.push(this.$store.state.products[i])
            this.arraySize++
          }
        }
      }
    }
  },
  /*
    Loads all products from store
     */
  getProdArray() {
    return this.prodArray
  }
}
</script>