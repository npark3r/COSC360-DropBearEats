import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import Browse from '../views/Browse.vue';
import User from '../views/User.vue';
import Cart from '../views/Cart.vue';
import Dashboard from '../views/Dashboard.vue';
import Checkout from "../views/Checkout.vue";
import Login from "../views/Login.vue";
import Account from "../views/Account.vue";
import OrderHistory from "../views/OrderHistory.vue";
import Stats from "../views/Stats.vue";

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/browse',
        name: 'browse',
        component: Browse
    },
    {
        path: '/user',
        name: 'user',
        component: User
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: Checkout
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/account',
        name: 'account',
        component: Account
    },
    {
        path: '/order-history',
        name: 'order-history',
        component: OrderHistory
    },
    {
        path: '/stats',
        name: 'stats',
        component: Stats
    }
]

const router = new Router(
    {
        routes,
        linkActiveClass: "active"
    }
)

export default router