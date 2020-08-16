import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './assets/sass/style.sass'
import store from "./store";

// Install BootstrapVue
Vue.use(BootstrapVue)

// Install BootstrapVue icon
Vue.use(IconsPlugin)



new Vue({
    el: '#app',
    data: {},
    methods: {
    },
    store,
    router: router,
    render: h => h(App)
})