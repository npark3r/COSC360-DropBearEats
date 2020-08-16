<template>
  <div class="row order-item">
    <div id="button_div">
      <button type="button" class="btn btn-primary" :id="'save' + orderIdGiven" v-on:click="saveOrderEdit()" style="display: none">Save</button>
      <button type="button" class="btn btn-danger" :id="'cancel' + orderIdGiven" v-on:click="cancelOrderEdit()" style="display: none">Cancel</button>
      <button type="button" class="btn btn-primary" :id="'view_order' + orderIdGiven" v-on:click="openItemEdit()">View</button>
      <button type="button" class="btn btn-primary" :id="'edit_order' + orderIdGiven" v-on:click="openEdit()">Edit</button>
      <button type="button" class="btn btn-danger" :id="'delete_order' + orderIdGiven" v-on:click="deleteOrder()">Delete</button>
    </div>
    <div class="col">
      <input type="date" class="form-control item" name="order_date" :value="getOrderItem(orderIdGiven).date" readonly>
    </div>
    <div class="col">
      <input type="text" class="form-control item" name="order_id" placeholder="Category" :value="getOrderItem(orderIdGiven).orderId" readonly>
    </div>
    <div class="col">
      <input type="number" class="form-control item" name="order_amount" :id="'order_amount' + orderIdGiven" placeholder="99.95" :value="printWithDecimals(getOrderItem(orderIdGiven).orderTotal)" :disabled="disabled">
    </div>
    <div class="col">
      <input type="text" class="form-control item" name="order_description" :id="'order_description' + orderIdGiven" placeholder="description" :value="getOrderItem(orderIdGiven).descp" :disabled="disabled">
    </div>
    <div class="col">
      <input type="text" class="form-control item" name="order_status"  :id="'order_status' + orderIdGiven" placeholder="description" :value="getOrderItem(orderIdGiven).status" :disabled="disabled">
    </div>
    <b-modal :id="'order' + orderIdGiven" size="xl" hide-footer :title="getOrderItem(orderIdGiven).descp">
      <p class="my-4 detail-heading">Items in order: </p>
      <div v-for="order_item in getOrderItem(orderIdGiven).orderedItems">
        <div class="row order-internal-item">
          <b-button pill :id="'edit_item' + orderIdGiven + order_item.id" class="modal-button" v-on:click="editItem(order_item.id)">Edit</b-button>
          <b-button pill :id="'delete_item' + orderIdGiven + order_item.id" variant="danger" class="modal-button" v-on:click="removeItem(order_item.id)">Delete</b-button>
          <button type="button" class="btn btn-primary" :id="'save_edit' + orderIdGiven + order_item.id" v-on:click="saveEdit(order_item.id)" style="display: none">Save</button>
          <button type="button" class="btn btn-danger" :id="'cancel_edit' + orderIdGiven + order_item.id" v-on:click="cancelEdit(order_item.id)" style="display: none">Cancel</button>
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
  name: 'DashboardOrderComponent',
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
    Returns the object containing the order details
     */
    getOrderItem(orderIdFromCall) {
      for (let i = 0; i < this.$store.state.orders.length; i++) {
        if(this.$store.state.orders[i].orderId.toString() == orderIdFromCall) {
          return this.$store.state.orders[i]
        }
      }
    },
    /*
    Returns the number with correct decimals for currency printing
     */
    printWithDecimals(price) {
      return (Math.round(price * 100) / 100).toFixed(2)
    },
    /*
    Removes product from order
     */
    removeItem(itemToDelete) {
      for (let i = 0; i < this.$store.state.orders.length; i++) {
        if(this.$store.state.orders[i].orderId.toString() == this.orderIdGiven) {
          for(let j = 0; j < this.$store.state.orders[i].orderedItems.length; j++) {
            if(this.$store.state.orders[i].orderedItems[j].id.toString() == itemToDelete) {
              this.$store.state.orders[i].orderedItems.splice(j, 1)
            }
          }
        }
      }
      let orderTotal = 0
      for (let i = 0; i < this.$store.state.orders.length; i++) {
        if(this.$store.state.orders[i].orderId.toString() == this.orderIdGiven) {
          for(let j = 0; j < this.$store.state.orders[i].orderedItems.length; j++) {
            orderTotal += this.$store.state.orders[i].orderedItems[j].quantity * this.$store.state.orders[i].orderedItems[j].price
          }
          this.$store.state.orders[i].orderTotal = orderTotal
        }
      }
      for (let i = 0; i < this.$store.state.orders.length; i++) {
        if(this.$store.state.orders[i].orderId.toString() == this.orderIdGiven) {
          if(this.$store.state.orders[i].orderedItems.length == 0) {
            this.$store.state.orders.splice(i,1)
            this.$bvModal.hide('order' + this.orderIdGiven)
            return
          }
        }
      }
    },
    /*
    Opens the modal to view and edit order items
     */
    openItemEdit() {
      this.$bvModal.show('order' + this.orderIdGiven)
    },
    /*
    Cancels editing of item in order
     */
    cancelEdit(idToEdit) {
      let saveButton = document.getElementById('save_edit' + this.orderIdGiven + idToEdit)
      let cancelButton = document.getElementById('cancel_edit' + this.orderIdGiven + idToEdit)
      let editButton = document.getElementById('edit_item' + this.orderIdGiven + idToEdit)
      let deleteButton = document.getElementById('delete_item' + this.orderIdGiven + idToEdit)
      let name = document.getElementById(this.orderIdGiven + idToEdit + 'name')
      let quantity = document.getElementById(this.orderIdGiven + idToEdit + 'quant')
      let price = document.getElementById(this.orderIdGiven + idToEdit + 'price')
      name.readOnly = true
      quantity.readOnly = true
      price.readOnly = true
      saveButton.style.display = 'none'
      cancelButton.style.display = 'none'
      editButton.style.display = 'inline'
      deleteButton.style.display = 'inline'
      this.disabled = ! this.disabled;
    },
    /*
    Saves the edits made to the item in the order
     */
    saveEdit(idToEdit) {
      let quantity = document.getElementById(this.orderIdGiven + idToEdit + 'quant').value
      let price = document.getElementById(this.orderIdGiven + idToEdit + 'price').value
      let total
      if (quantity.length == 0 || price.length == 0) {
        alert("Edited fields can not be empty.")
        return
      }

      if(isNaN(quantity) || isNaN(price)) {
        alert("Quantity and price must be numbers")
        return
      } else {
        total = price * quantity
      }

      for (let i = 0; i < this.$store.state.orders.length; i++) {
        if(this.$store.state.orders[i].orderId.toString() == this.orderIdGiven) {
          for(let j = 0; j < this.$store.state.orders[i].orderedItems.length; j++) {
            if(this.$store.state.orders[i].orderedItems[j].id.toString() == idToEdit) {
              this.$store.state.orders[i].orderedItems[j].quantity = quantity
              this.$store.state.orders[i].orderedItems[j].price = price
              this.$store.state.orders[i].orderedItems[j].orderTotal = total
            }
          }
        }
      }
      let orderTotal = 0
      for (let i = 0; i < this.$store.state.orders.length; i++) {
        if(this.$store.state.orders[i].orderId.toString() == this.orderIdGiven) {
          for(let j = 0; j < this.$store.state.orders[i].orderedItems.length; j++) {
            orderTotal += this.$store.state.orders[i].orderedItems[j].quantity * this.$store.state.orders[i].orderedItems[j].price
          }
          this.$store.state.orders[i].orderTotal = orderTotal
        }
      }

      let saveButton = document.getElementById('save_edit' + this.orderIdGiven + idToEdit)
      let cancelButton = document.getElementById('cancel_edit' + this.orderIdGiven + idToEdit)
      let editButton = document.getElementById('edit_item' + this.orderIdGiven + idToEdit)
      let deleteButton = document.getElementById('delete_item' + this.orderIdGiven + idToEdit)
      saveButton.style.display = 'none'
      cancelButton.style.display = 'none'
      editButton.style.display = 'inline'
      deleteButton.style.display = 'inline'
      let quantityField = document.getElementById(this.orderIdGiven + idToEdit + 'quant')
      let priceField = document.getElementById(this.orderIdGiven + idToEdit + 'price')
      quantityField.readOnly = true
      priceField.readOnly = true
    },
    /*
    Allows editing of item in order
     */
    editItem(idToEdit) {
      let saveButton = document.getElementById('save_edit' + this.orderIdGiven + idToEdit)
      let cancelButton = document.getElementById('cancel_edit' + this.orderIdGiven + idToEdit)
      let editButton = document.getElementById('edit_item' + this.orderIdGiven + idToEdit)
      let deleteButton = document.getElementById('delete_item' + this.orderIdGiven + idToEdit)
      saveButton.style.display = 'inline'
      cancelButton.style.display = 'inline'
      editButton.style.display = 'none'
      deleteButton.style.display = 'none'
      this.$data.disabledView = false
      let quantity = document.getElementById(this.orderIdGiven + idToEdit + 'quant')
      let price = document.getElementById(this.orderIdGiven + idToEdit + 'price')
      quantity.readOnly = false
      price.readOnly = false
    },
    /*
    Allows editing of order details
     */
    openEdit(idToEdit) {
      this.disabled = !this.disabled
      let save = document.getElementById('save' + this.orderIdGiven)
      let cancel = document.getElementById('cancel' + this.orderIdGiven)
      let edit = document.getElementById('edit_order' + this.orderIdGiven)
      let deleteBtn = document.getElementById('delete_order' + this.orderIdGiven)
      let view = document.getElementById('view_order' + this.orderIdGiven)
      save.style.display = 'inline'
      cancel.style.display = 'inline'
      edit.style.display = 'none'
      deleteBtn.style.display = 'none'
      view.style.display = 'none'
    },
    /*
    Cancel editing of order details
     */
    cancelOrderEdit() {
      this.disabled = !this.disabled
      let save = document.getElementById('save' + this.orderIdGiven)
      let cancel = document.getElementById('cancel' + this.orderIdGiven)
      let edit = document.getElementById('edit_order' + this.orderIdGiven)
      let deleteBtn = document.getElementById('delete_order' + this.orderIdGiven)
      let view = document.getElementById('view_order' + this.orderIdGiven)
      save.style.display = 'none'
      cancel.style.display = 'none'
      edit.style.display = 'inline'
      deleteBtn.style.display = 'inline'
      view.style.display = 'inline'
    },
    /*
    Save changes made to order
     */
    saveOrderEdit() {
      let amount = document.getElementById('order_amount' + this.orderIdGiven).value
      let description = document.getElementById('order_description' + this.orderIdGiven).value
      let status = document.getElementById('order_status' + this.orderIdGiven).value
      let save = document.getElementById('save' + this.orderIdGiven)
      let cancel = document.getElementById('cancel' + this.orderIdGiven)
      let edit = document.getElementById('edit_order' + this.orderIdGiven)
      let deleteBtn = document.getElementById('delete_order' + this.orderIdGiven)
      let view = document.getElementById('view_order' + this.orderIdGiven)
      if (amount.length == 0 || description.length == 0 || status.length == 0) {
        alert("Edited fields can not be empty.")
        return
      } else {
        for (let i = 0; i < this.$store.state.orders.length; i++) {
          if(this.$store.state.orders[i].orderId.toString() == this.orderIdGiven) {
            this.$store.state.orders[i].orderTotal = amount
            this.$store.state.orders[i].status = status
            this.$store.state.orders[i].descp = description
          }
        }
        this.disabled = !this.disabled
        save.style.display = 'none'
        cancel.style.display = 'none'
        edit.style.display = 'inline'
        deleteBtn.style.display = 'inline'
        view.style.display = 'inline'
      }
    },
    /*
    Deletes order
     */
    deleteOrder() {
      for (let i = 0; i < this.$store.state.orders.length; i++) {
        if(this.$store.state.orders[i].orderId.toString() == this.orderIdGiven) {
          this.$store.state.orders.splice(i,1)
        }
      }
    }
  }
}
</script>