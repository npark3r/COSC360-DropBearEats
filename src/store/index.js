import Vue from 'vue';
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loggedIn: false,
        // current users details for specific access
        user: {
            userName: "",
            fullName: "",
            address: "",
            contactNumber: "",
            adminRights: false
        },
        // stored users able to log in
        registeredUsers: [
            {
                regUserName: "testuser",
                password: "testpassword",
                storedName: "",
                storedAddr: "",
                storedPhone: ""
            },
            {
                regUserName: "admin",
                password: "admin",
                storedName: "",
                storedAddr: "",
                storedPhone: ""
            }
        ],
        //total value in cart
        cartTotal: 0,
        // array containing all cart items
        cart: [],
        ordersTotal: 0,
        orderIdRef: 1,
        orders: [],
        products: [
            //each product available for ordering
            {
                id: 0,
                name: "Buddha Bowl",
                descp: "A delicious bowl filled with vegetable goodness",
                price: 15.00,
                cuisine: "indian",
                quantity: 1,
                restaurant: "ale"
            },
            {
                id: 1,
                name: "Pancakes w/ Syrup",
                descp: "Six pancakes topped with golden maple syrup",
                price: 12.00,
                cuisine: "french",
                quantity: 1,
                restaurant: "pos"
            },
            {
                id: 2,
                name: "Tomato and Olive Pizzas",
                descp: "Pizza topped with tomato and olives",
                price: 14.00,
                cuisine: "italian",
                quantity: 1,
                restaurant: "ale"
            },
            {
                id: 3,
                name: "Bacon Tappas",
                descp: "Bacon and Cheese on picks",
                price: 12.50,
                cuisine: "french",
                quantity: 1,
                restaurant: "frank"
            },
            {
                id: 4,
                name: "Rice with Veg and Egg",
                descp: "text about pancakes",
                price: 10.00,
                cuisine: "indian",
                quantity: 1,
                restaurant: "frank"
            },
            {
                id: 5,
                name: "Chilli and Rocket Pizza",
                descp: "Pizza topped with chilli, cheese and rocket.",
                price: 12.00,
                cuisine: "italian",
                quantity: 1,
                restaurant: "ale"
            },
            {
                id: 6,
                name: "Greek Salad with Crisps",
                descp: "Greek salad topped with a creamy sauce, with 2 crisps alongside.",
                price: 12.00,
                cuisine: "italian",
                quantity: 1,
                restaurant: "ale"
            },
            {
                id: 7,
                name: "Chocolate cake",
                descp: "Choc cake with white choc layer.",
                price: 13.50,
                cuisine: "french",
                quantity: 1,
                restaurant: "pos"
            }
        ]
    },
    getters: {
    },
    mutations: {
        /*
    Adds product to cart
     */
        addToCart(state, productGiven) {
            let id = productGiven.pay.id
            let name = productGiven.pay.name
            let descp = productGiven.pay.descp
            let rest = productGiven.pay.restaurant
            let price = productGiven.pay.price
            let quantity = productGiven.pay.quantity
            let foundId = false;
            for (let i = 0; i < this.state.cart.length; i++) {
                if (this.state.cart[i].id == id) {
                    this.state.cart[i].quantity += 1;
                    foundId = true;
                    this.state.cartTotal++;
                }
            }
            if (!foundId) {
                this.state.cart.push({"id": id, "name" : name, "descp" : descp, "restaurant": rest, "quantity" :quantity, "price" : price})
                this.state.cartTotal++;
            }
        },
        /*
    Adds cart to orders
     */
        addToOrders(state, orderGiven) {
            orderGiven.orderId = this.state.orderIdRef
            orderGiven.descp = this.state.user.userName+orderGiven.orderId
            orderGiven.status = "Processing"
            this.state.orderIdRef++
            this.state.orders.push(orderGiven)
        }
    },
    actions: {}
});
