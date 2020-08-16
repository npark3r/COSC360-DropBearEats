<template>
  <div class="container dashboard">
    <div class="row">
      <aside class="col-2 sidebar">
          <nav class="nav flex-column">
          <router-link v-if="$store.state.user.adminRights == true" to="/dashboard" class="nav-link">Orders</router-link>
            <router-link v-if="$store.state.user.adminRights == true" to="/stats" class="nav-link">Statistics</router-link>
        </nav>
      </aside>
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
            <dashboard-order-component :order-id-given="orderitem.orderId.toString()"></dashboard-order-component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import DashboardOrderComponent from "../components/DashboardOrderComponent.vue";
export default {
  name: 'Dashboard',
  data: function() {
    return {
      ordersSize: this.$store.state.orders.length,
      orders: this.$store.state.orders
    }
  },
  components: {DashboardOrderComponent}
}
</script>