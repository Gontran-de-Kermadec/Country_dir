import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let notesStored = JSON.parse(localStorage.getItem("countryNotes"));

export default new Vuex.Store({
    state: {
        country: "",
        activeCountry: "",
        countryHoverId: "",
        existingNotes: [],
        notes: notesStored
    },
    mutations: {
        GET_TITLE(state, payload) {
            state.country = payload;
            console.log(state.country);
        },
        SELECTED_COUNTRY(state, payload) {
            state.activeCountry = payload;
            console.log(state.activeCountry);
        },
        HOVER_ID(state, payload) {
            state.countryHoverId = payload;
            console.log(state.countryHoverId);
        },
        EXISTING_NOTES(state, payload) {
            state.existingNotes.push(payload);
            //state.existingNotes = payload;
            console.log(state.existingNotes);
        }
    },
    actions: {

    }
});

