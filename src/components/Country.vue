<template>
	<div class="container">
		<transition name="fade">
			<div class="note" v-if="activeCountry">
				<button @click="closeNoteSection">
					Fermer
				</button>
				<p id="countryName">{{ activeCountry }}</p>
				<div class="isVisited">
					<button :id="visited" @click="visitedCountry">
						Visité
					</button>
					<button :id="toVisit" @click="toVisitCountry">À visiter</button>
				</div>
				<div class="add_note">
					<label for="long_note">Remarque</label><br />
					<textarea
						name="long_note"
						id="long_note"
						v-model="newNote"
						@blur="addNewNote"
					></textarea
					><br />
					<button @click="addNewNote">Ajouter</button>
				</div>
				<div class="allnotes">
					<transition-group name="slideup" class="allnotes_content">
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
							<p v-if="item.id === activeCountry">{{ item.note }}</p>
						</div>
					</transition-group>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	let storageSelectedCountry = JSON.parse(
		localStorage.getItem("visitedCountry")
	);
	//import { gsap } from "gsap";
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
			// animFadeIn() {
			// 	const tl = gsap.timeline();
			// 	tl.to(".container", { x: -300, duration: 1 });
			// 	//tl.to(".country", { x: 0, width: 1000, duration: 1, zIndex: 100 });
			// },
			// 	selectCountry() {
			// 	console.log("click");
			// 	//countryId = e.path[0].attributes[1].value; // chemin pour obtenir l'id du pays
			// 	//this.$store.commit("COUNTRY_ID", countryId);
			// 	let oneCountry = document.getElementById(countryId);
			// 	if (oneCountry.classList.contains("visited")) {
			// 		this.visited = "true";
			// 	} else {
			// 		this.visited = "false";
			// 	}
			// 	if (oneCountry.classList.contains("toVisit")) {
			// 		this.toVisit = "true";
			// 	} else {
			// 		this.toVisit = "false";
			// 	}
			// 	this.activeCountry = e.path[0].attributes[2].value; //chemin pour acceder à la valeur du nom de pays
			// 	this.$store.commit("SELECTED_COUNTRY", e.path[0].attributes[2].value);
			// 	//this.$store.commit("ACTIVE_COUNTRY", e.path[0].attributes[2].value);
			// 	const tl = gsap.timeline();
			// 	tl.to(".country", { x: -300, duration: 1 });
			// },
			addNewNote() {
				if (this.newNote !== "") {
					//console.log(typeof notesStored);
					this.existingNotes.push({
						id: this.activeCountry,
						note: this.newNote,
					});
					//this.$store.commit("EXISTING_NOTES", { note: this.newNote });
					let payload = { countryName: this.activeCountry, note: this.newNote };
					//this.$store.commit("EXISTING_NOTES", this.newNote);
					this.$store.commit("EXISTING_NOTES", payload);

					//countryNotes.push({ countryId, note: this.newNote });
					// if (notesStored === null) {
					// 	localStorage.setItem(
					// 		"countryNotes",
					// 		JSON.stringify({ countryId, note: this.newNote })
					// 	);
					// } else {
					// 	notesStored.push({ countryId, note: this.newNote });
					// 	//localStorage.setItem("countryNotes", JSON.stringify(countryNotes));
					// 	localStorage.setItem("countryNotes", JSON.stringify(notesStored));
					// }

					console.log(this.existingNotes);
					this.newNote = "";
					//this.$store.commit("NEW_NOTE", "");
				}
			},
			closeNoteSection() {
				this.$store.commit("SELECTED_COUNTRY", "");
				//this.activeCountry = "";
			},
			visitedCountry() {
				let oneCountry = document.getElementById(this.countryId);
				let oneCountryId = oneCountry.id;
				console.log(oneCountry.classList.contains("visited"));
				//this.toVisit = "false";
				this.$store.commit("TO_VISIT", "false");
				if (this.visited === "true") {
					//this.visited = "false";
					this.$store.commit("VISITED", "false");
					oneCountry.classList.remove("visited");
					this.removeVisitedCountry(oneCountryId);
				} else if (this.visited === "false") {
					this.$store.commit("VISITED", "true");
					//this.visited = "true";
					oneCountry.classList.add("visited");
					oneCountry.classList.remove("toVisit");
					this.storeVisitedCountry(oneCountryId, this.visited);
				}
			},
			toVisitCountry() {
				let oneCountry = document.getElementById(this.countryId);
				console.log(oneCountry.classList.contains("toVisit"));
				//this.visited = "false";
				this.$store.commit("VISITED", "false");
				if (this.toVisit === "true") {
					//this.toVisit = "false";
					this.$store.commit("TO_VISIT", "false");
					oneCountry.classList.remove("toVisit");
				} else if (this.toVisit === "false") {
					//this.toVisit = "true";
					this.$store.commit("TO_VISIT", "true");
					oneCountry.classList.add("toVisit");
					oneCountry.classList.remove("visited");
				}
				//this.toVisit = !this.toVisit;
			},
			storeVisitedCountry(countryId, visitedStatus) {
				console.log(countryId);
				console.log(visitedStatus);
				//let visitedCountryData = { country: countryId, status: visitedStatus };
				if (storageSelectedCountry === null) {
					storageSelectedCountry = [];
					//storageSelectedCountry.push(visitedCountryData);
					storageSelectedCountry.push(countryId);
					//console.log(storageSelectedCountry.country);
				} else if (storageSelectedCountry !== null) {
					//storageSelectedCountry.push(countryId);
					if (storageSelectedCountry.includes(countryId)) {
						console.log(countryId);
					} else {
						storageSelectedCountry.push(countryId);
						console.log(storageSelectedCountry);
					}
					// let findCountry = storageSelectedCountry.find(
					// 	(item) => item.country == countryId
					// );
					// if (findCountry === undefined) {
					// 	storageSelectedCountry.push(visitedCountryData);
					// 	console.log(storageSelectedCountry);
					// } else {
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
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}
	.note {
		position: absolute;
		right: 0;
		/* top: 50%; */
		background: lightblue;
		width: 500px;
		height: 100vh;
		z-index: 100;
		text-align: center;
		padding: 0 20px;
	}
	.note_content {
		font-size: 1.5rem;
		padding: 0 20px;
	}
	.note_content p {
		/* border: solid; */
		padding: 10px 5px;
		background: #ebf5ee;
		border-radius: 5px;
		margin: 10px 0;
	}
	.isVisited {
		text-align: center;
	}
	.isVisited button {
		all: unset;
		border: solid;
		padding: 10px 20px;
		margin: 10px;
		cursor: pointer;
	}
	.isVisited #true {
		transition: 0.5s;
		background: tomato;
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
</style>
