<template>
  <div class="content">
    <div class="col-2"></div>
    <div class="col-10 content">
      <header class="row">
        <div class="col">
          <h1>Orders</h1>
        </div>
      </header>
      <div class="orders">
        <div class="row list_header">
          <div class="col"></div>
          <div class="col">
            Date
          </div>
          <div class="col">
            Order ID
          </div>
          <div class="col">
            Amount
          </div>
          <div class="col">
            Description
          </div>
          <div class="col">
            Status
          </div>
        </div>
        <div v-if="ordersSize > 0" v-for="orderitem in orders">
          <order-history-component :order-id-given="orderitem.orderId.toString()"></order-history-component>
        </div>
      </div>
    </div>
    <div class="col-2"></div>
  </div>

</template>

<script>

import OrderHistoryComponent from "../components/OrderHistoryComponent.vue";
export default {
  name: 'OrderHistory',
  components: {OrderHistoryComponent},
  data: function(){
    return {
      ordersSize: this.$store.state.orders.length,
      orders: this.$store.state.orders
    }
  }
}
</script>