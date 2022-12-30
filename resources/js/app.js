 

require('./bootstrap');

// window.Vue = require('vue').default;
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios) 

Vue.component('todo-list', require('./components/TodoList.vue').default);
 

const app = new Vue({
    el: '#app',
});
