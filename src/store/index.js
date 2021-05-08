import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let notesStored = JSON.parse(localStorage.getItem("countryNotes"));
//let visitedCountries = JSON.parse(localStorage.getItem('visitedCountry'))
//console.log(visitedCountries);
export default new Vuex.Store({
    state: {
        country: "",
        activeCountry: "",
        countryHoverId: "",
        //newNote: "",
        existingNotes: [],
        notes: notesStored,
        visited: "false",
        toVisit: "false",
        hover: false,
		active: false,
        countryId: ""
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
        },
        DELETE_NOTE(state, payload) {
            console.log(state.existingNotes);
            let result = state.existingNotes.findIndex(element => element.note === payload)
            console.log(result);
            state.existingNotes.splice(result, 1)
            console.log(state.existingNotes);
        },
        COUNTRY_ID(state, payload) {
            state.countryId = payload;
            console.log(state.countryId);
        },
        VISITED(state, payload) {
            state.visited = payload;
            console.log(state.visited);
        },
        TO_VISIT(state, payload) {
            state.toVisit = payload;
            console.log(state.toVisit);
        }
    },
    actions: {
    }
});

