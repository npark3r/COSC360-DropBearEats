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
        <div class="row list_header">
          <div class="col" align="center">
            <p>Total Order Value from Each Restaurant</p>
          </div>
          <div class="col" align="center">
            <p>Line Chart of Order Value</p>
          </div>
        </div>
        <div class="row">
          <div class="col" align="center">
            <svg id="pie-chart" viewBox="0 0 32 32">
              <circle class='first' :stroke-dasharray="getCircleDash(1).value"></circle>
              <circle class='second' :stroke-dasharray="getCircleDash(2).value"></circle>
              <circle class='third' :stroke-dasharray="getCircleDash(3).value"></circle>
            </svg>
            <svg>
              <rect x="50" y="20" width="15" height="15"style="fill:blue;stroke:black"></rect>
              <rect x="50" y="70" width="15" height="15" style="fill:black;stroke:black"></rect>
              <rect x="50" y="120" width="15" height="15" style="fill:purple;stroke:black"></rect>
              <text x="75" y="32" class="label-title">- {{ this.getCircleDash(1).name }}</text>
              <text x="75" y="82" class="label-title">- {{ this.getCircleDash(2).name }}</text>
              <text x="75" y="132" class="label-title">- {{ this.getCircleDash(3).name }}</text>
            </svg>
          </div>
          <div class="col" align="center">
            <div class="col">
              <svg class="chart2" width="500" height="300">
                <line x1="50" x2="50" y1="5" y2="250" style="stroke:rgb(0,0,0);stroke-width:2"></line>
                <line x1="50" x2="500" y1="250" y2="250" style="stroke:rgb(0,0,0);stroke-width:2"></line>
                <g class="labels x-labels">
                  <text x="250" y="275" class="label-title" >Orders</text>
                </g>
                <g class="labels y-labels">
                  <text x="20" y="15">500</text>
                  <text x="20" y="62.5">375</text>
                  <text x="20" y="125">250</text>
                  <text x="20" y="187.5">125</text>
                  <text x="15" y="150" class="label-title" transform="rotate(-90,15,150)">Value (A$)</text>
                </g>
                <polyline :points="getPoints()"
                          style="fill:white;stroke:red;stroke-width:2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Stats',
  methods: {
    /*
    Method to get points for polyline in line chart
     */
    getPoints() {
      let pointString = "50,250 "
      let orderTotalsArray = []
      for(let i =0; i < this.$store.state.orders.length; i++) {
        orderTotalsArray.push(this.$store.state.orders[i].orderTotal)
      }

      for(let j = 0; j < orderTotalsArray.length; j ++) {
        let stringToPush = (50 + (450/orderTotalsArray.length)*(j+1)) + "," + (250-((orderTotalsArray[j]/500)*250)) + " "
        pointString += stringToPush
      }
      return pointString
    },
    /*
    Method to get percentages and names for pie chart
     */
    getCircleDash(position) {
      let poTotal = 0
      let frankTotal = 0
      let aleTotal = 0
      let total = 0
      let poPercentage = 0
      let frankPercentage = 0
      let alePercentage = 0

      for (let i = 0; i < this.$store.state.orders.length; i++) {
        for (let j = 0; j < this.$store.state.orders[i].orderedItems.length; j++) {
          if (this.$store.state.orders[i].orderedItems[j].restaurant == 'pos') {
            poTotal += (this.$store.state.orders[i].orderedItems[j].price * this.$store.state.orders[i].orderedItems[j].quantity)
          } else if (this.$store.state.orders[i].orderedItems[j].restaurant == 'ale') {
            aleTotal += (this.$store.state.orders[i].orderedItems[j].price * this.$store.state.orders[i].orderedItems[j].quantity)
          } else if (this.$store.state.orders[i].orderedItems[j].restaurant == 'frank') {
            frankTotal += (this.$store.state.orders[i].orderedItems[j].price * this.$store.state.orders[i].orderedItems[j].quantity)
          }
          total += (this.$store.state.orders[i].orderedItems[j].price * this.$store.state.orders[i].orderedItems[j].quantity)
        }
      }

      poPercentage = poTotal/total * 100
      frankPercentage = frankTotal/total * 100
      alePercentage = aleTotal/total * 100
      let temp = 0

      // ugly conditionals to check the ordering of pie chart percentages xD
      if (position == 1) {
        if (poTotal >= frankTotal && poTotal >= aleTotal) {
          temp = poPercentage + frankPercentage + alePercentage
          return {
            "value": "" + temp + " 100",
            "name": "Po\'s"
          }
        } else if (frankTotal >= aleTotal) {
          temp = poPercentage + frankPercentage + alePercentage
          return {
            "value": "" + temp + " 100",
            "name": 'Frank\'s'
          }
        } else {
          temp = poPercentage + frankPercentage + alePercentage
          return {
            "value": "" + temp + " 100",
            "name": 'Alejandro\'s'
          }
        }
      }else if (position == 2) {
        if (poTotal >= frankTotal && poTotal <= aleTotal) {
          temp = poPercentage + frankPercentage
          return {
            "value": "" + temp + " 100",
            "name": "Po\'s"
            }
          } else if (poTotal >= aleTotal && poTotal <= frankTotal) {
          temp = poPercentage + alePercentage
            return {
            "value": "" + temp + " 100",
            "name": "Po\'s"
            }
          } else if (frankTotal >= poTotal && frankTotal <= aleTotal) {
          temp = frankPercentage + poPercentage
            return {
              "value": "" + temp + " 100",
              "name": 'Frank\'s'
            }
          } else if (frankTotal >= aleTotal && frankTotal <= poTotal) {
          temp = frankPercentage + alePercentage
          return {
            "value": "" + temp + " 100",
            "name": 'Frank\'s'
          }
        } else if (aleTotal >= poTotal && aleTotal <= frankTotal) {
          temp = poPercentage + alePercentage
          return {
            "value": "" + temp + " 100",
            "name": 'Alejandro\'s'
          }
        } else if (aleTotal >= frankTotal && aleTotal <= poTotal) {
          temp = frankPercentage + alePercentage
          return {
            "value": "" + temp + " 100",
            "name": 'Alejandro\'s'
          }
        }
      }else if (position == 3) {
        if (poTotal <= frankTotal && poTotal <= aleTotal) {
          return {
            "value": "" + poPercentage + " 100",
            "name": "Po\'s"
          }
        } else if (frankTotal <= aleTotal) {
          return {
            "value": "" + frankPercentage + " 100",
            "name": 'Frank\'s'
          }
        } else {
          return {
            "value": "" + alePercentage + " 100",
            "name": 'Alejandro\'s'
          }
        }
      }
    }
  }
}
</script>