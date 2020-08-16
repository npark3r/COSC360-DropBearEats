<template>
  <div class="row order-item">
    <div id="button_div">
      <button type="button" class="btn btn-primary" id="view_order" v-on:click="openView()">View</button>
    </div>
    <div class="col">
      <input type="date" class="form-control item" name="order_date" :value="getOrderItem(orderIdGiven).date" readonly>
    </div>
    <div class="col">
      <input type="text" class="form-control item" name="order_id" placeholder="Category" :value="getOrderItem(orderIdGiven).orderId" readonly>
    </div>
    <div class="col">
      <input type="number" class="form-control item" name="order_amount" placeholder="99.95" :value="printWithDecimals(getOrderItem(orderIdGiven).orderTotal)" :disabled="disabled">
    </div>
    <div class="col">
      <input type="text" class="form-control item" name="order_description"placeholder="description" :value="getOrderItem(orderIdGiven).descp" :disabled="disabled">
    </div>
    <div class="col">
      <input type="text" class="form-control item" name="order_status" placeholder="description" :value="getOrderItem(orderIdGiven).status" :disabled="disabled">
    </div>
    <b-modal :id="'order' + orderIdGiven" size="xl" hide-footer :title="getOrderItem(orderIdGiven).descp">
      <p class="my-4 detail-heading">Items in order: </p>
      <div v-for="order_item in getOrderItem(orderIdGiven).orderedItems">
        <div class="row order-internal-item">
          <label>ID: </label>
          <input type="text" :id="orderIdGiven + order_item.id + 'id'" size="6" maxlength="6" :value="order_item.id" readonly>
          <label>Name: </label>
          <input type="text" :id="orderIdGiven + order_item.id + 'name'" :value="order_item.name" readonly>
          <label>Quantity: </label>
          <input type="text" :id="orderIdGiven + order_item.id + 'quant'" size="4" maxlength="4" :value="order_item.quantity" readonly>
          <label>Price: </label>
          <input type="text" :id="orderIdGiven + order_item.id + 'price'" size="12" maxlength="12" :value="printWithDecimals(order_item.price)" readonly>
          <label>Total: </label>
          <input type="text" :id="orderIdGiven + order_item.id + 'total'" size="12" maxlength="12" :value="printWithDecimals(order_item.price * order_item.quantity)" readonly>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'OrderHistoryComponent',
  data: function() {
    return {
      orderArraySize: this.$store.state.orders.length,
      disabledView: true,
      disabled: true
    }
  },
  props: {
    orderIdGiven: String
  },
  methods: {
    /*
    Returns the object containing the order
     */
    getOrderItem(orderIdFromCall) {
      for (let i = 0; i < this.$store.state.orders.length; i++) {
        if(this.$store.state.orders[i].orderId.toString() == orderIdFromCall) {
          return this.$store.state.orders[i]
        }
      }
    },
    /*
    Outputs the number suitably as currency
     */
    printWithDecimals(price) {
      return (Math.round(price * 100) / 100).toFixed(2)
    },
    /*
    Open modal to view ordered items
     */
    openView() {
      this.$bvModal.show('order' + this.orderIdGiven)
    }
  }
}
</script>