import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        country: ""
    },
    mutations: {
        GET_TITLE(state, payload) {
            state.country = payload;
            console.log(state.country);
        }
    },
    actions: {

    }
});

