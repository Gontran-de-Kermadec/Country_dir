<template>
	<div class="container">
		<transition name="fade">
			<div class="note" v-if="activeCountry">
				<button @click="closeNoteSection">
					Fermer
				</button>
				<p id="countryName">{{ activeCountry }}</p>
				<div class="visit">
					<button :id="visited" class="isVisited" @click="visitedCountry">
						Visité
					</button>
					<button :id="toVisit" class="isToVisit" @click="toVisitCountry">
						À visiter
					</button>
				</div>
				<div class="add_note">
					<label for="long_note">Remarque</label><br />
					<textarea name="long_note" id="long_note" v-model="newNote"></textarea
					><br />
					<button @click="addNewNote">Ajouter</button>
				</div>
				<div class="allnotes">
					<!-- <transition-group name="slideup" class="allnotes_content"> -->
					<!-- <div
							class="note_content"
							v-for="(item, index) in notes"
							:key="index"
						>
							<p v-if="item.countryId === countryHoverId">{{ item.note }}</p>
						</div> -->
					<div
						class="note_content"
						v-for="(item, index) in existingNotes"
						:key="index"
					>
						<p v-if="item.countryName === activeCountry">{{ item.note }}</p>
						<button class="delete" @click="deleteNote">X</button>
					</div>
					<!-- </transition-group> -->
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	let storageSelectedCountry = JSON.parse(
		localStorage.getItem("visitedCountry")
	);
	let toVisitCountries = JSON.parse(localStorage.getItem("toVisitCountries"));
	import { gsap } from "gsap";
	import { mapState } from "vuex";
	export default {
		name: "Country",
		data() {
			return {
				newNote: "",
			};
		},
		computed: {
			...mapState([
				"activeCountry",
				"countryId",
				"visited",
				"toVisit",
				"existingNotes",
			]),
		},
		methods: {
			addNewNote() {
				if (this.newNote !== "") {
					let payload = { countryName: this.activeCountry, note: this.newNote };
					this.$store.commit("EXISTING_NOTES", payload);
					this.newNote = "";
				}
			},
			closeNoteSection() {
				this.$store.commit("SELECTED_COUNTRY", "");
				gsap.to(".note", { opacity: 0, x: 550, duration: 0.7 });
			},
			visitedCountry() {
				let oneCountry = document.getElementById(this.countryId);
				let oneCountryId = oneCountry.id;
				console.log(oneCountry.classList.contains("visited"));
				this.$store.commit("TO_VISIT", "false");
				if (this.visited === "true") {
					this.$store.commit("VISITED", "false");
					oneCountry.classList.remove("visited");
					this.removeVisitedCountry(oneCountryId);
				} else if (this.visited === "false") {
					this.$store.commit("VISITED", "true");
					oneCountry.classList.add("visited");
					oneCountry.classList.remove("toVisit");
					this.storeVisitedCountry(oneCountryId, this.visited);
				}
			},
			toVisitCountry() {
				let oneCountry = document.getElementById(this.countryId);
				console.log(oneCountry.classList.contains("toVisit"));
				let oneCountryId = oneCountry.id;
				this.$store.commit("VISITED", "false");
				if (this.toVisit === "true") {
					this.$store.commit("TO_VISIT", "false");
					oneCountry.classList.remove("toVisit");
					this.removetoVisitCountries(oneCountryId);
				} else if (this.toVisit === "false") {
					this.$store.commit("TO_VISIT", "true");
					oneCountry.classList.add("toVisit");
					oneCountry.classList.remove("visited");
					this.storeToVisitCountries(oneCountryId);
				}
			},
			storeVisitedCountry(countryId, visitedStatus) {
				console.log(countryId);
				console.log(visitedStatus);
				if (storageSelectedCountry === null) {
					storageSelectedCountry = [];
					storageSelectedCountry.push(countryId);
				} else if (storageSelectedCountry !== null) {
					storageSelectedCountry.push(countryId);
					// if (storageSelectedCountry.includes(countryId)) {
					// 	console.log(countryId);
					// } else {
					// 	storageSelectedCountry.push(countryId);
					// 	console.log(storageSelectedCountry);
					// }
				}
				localStorage.setItem(
					"visitedCountry",
					JSON.stringify(storageSelectedCountry)
				);
			},
			removeVisitedCountry(countryId) {
				let getIndex = storageSelectedCountry.indexOf(countryId);
				console.log(getIndex);
				storageSelectedCountry.splice(getIndex, 1);
				localStorage.setItem(
					"visitedCountry",
					JSON.stringify(storageSelectedCountry)
				);
			},
			storeToVisitCountries(countryId) {
				console.log(countryId);
				if (toVisitCountries === null) {
					toVisitCountries = [];
					toVisitCountries.push(countryId);
				} else if (toVisitCountries !== null) {
					toVisitCountries.push(countryId);
				}
				localStorage.setItem(
					"toVisitCountries",
					JSON.stringify(toVisitCountries)
				);
			},
			removetoVisitCountries(countryId) {
				let getIndex = storageSelectedCountry.indexOf(countryId);
				toVisitCountries.splice(getIndex, 1);
				localStorage.setItem(
					"toVisitCountries",
					JSON.stringify(toVisitCountries)
				);
			},
			deleteNote(e) {
				this.$store.commit("DELETE_NOTE", e.path[1].children[0].innerText);
			},
		},
	};
</script>

<style scoped>
	.add_note textarea {
		margin: 0 30px;
		width: 300px;
		height: 50px;
	}
	#countryName {
		text-align: center;
		text-transform: uppercase;
		font-weight: bold;
		font-size: 2rem;
	}
	/* .fade-enter-active, */
	.fade-leave-active {
		/* transition: 0.5s; */
		animation: slideOut 0.7s ease-out;
	}
	/* .fade-enter,
	.fade-leave-to {
		animation: slideIn 0.5s;
	} */
	.container {
		position: relative;
	}
	.note {
		position: absolute;
		right: 0;
		background: lightblue;
		width: 500px;
		height: 100vh;
		z-index: 100;
		text-align: center;
		padding: 0 20px;
	}
	.note_content {
		position: relative;
		font-size: 1.5rem;
		padding: 0 20px;
		animation: slidedown 0.7s ease-out;
	}
	.note_content p {
		padding: 10px 5px;
		background: #ebf5ee;
		border-radius: 5px;
		margin: 10px 0;
	}
	.note_content button {
		all: unset;
		position: absolute;
		right: 30px;
		top: 50%;
		transform: translateY(-50%);
		font-size: 1rem;
		cursor: pointer;
		background-color: lightblue;
		padding: 5px;
		border-radius: 5px;
		opacity: 0;
		transition: 0.3s;
	}
	.note_content:hover button {
		opacity: 1;
	}
	.allnotes {
		overflow-y: scroll;
		max-height: 400px;
		margin: 0 20px;
	}
	.allnotes::-webkit-scrollbar {
		width: 6px;
	}
	.allnotes::-webkit-scrollbar-thumb {
		background-color: transparent;
		border-radius: 5px;
	}
	.allnotes:hover::-webkit-scrollbar-thumb {
		background-color: #ebf5ee;
	}
	.allnotes_content {
		display: flex;
		flex-direction: column-reverse;
	}
	.visit {
		text-align: center;
	}
	.visit button {
		all: unset;
		border: solid 1px;
		padding: 10px 20px;
		margin: 10px;
		cursor: pointer;
	}
	.visit #true {
		transition: 0.5s;
		background: #7ca6f3;
	}
	.slideup-enter-active,
	.slideup-leave-active {
		animation: slidedown 0.7s ease-out;
	}
	@keyframes slidedown {
		0% {
			opacity: 0;
			transform: translateY(-300px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
	@keyframes slideOut {
		0% {
			opacity: 1;
			transform: translateX(0px);
		}
		100% {
			opacity: 0;
			transform: translateX(550px);
		}
	}
</style>
