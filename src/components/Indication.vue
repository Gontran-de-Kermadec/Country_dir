<template>
	<div class="country" v-if="country !== ''">
		<p class="country_title">{{ country }}</p>
		<p class="test">Choses à écrire</p>
		<div class="allnotes">
			<div
				class="note_content"
				v-for="(item, index) in notes"
				:key="'item' + index"
			>
				<p v-if="item.countryId === countryHoverId">{{ item.note }}</p>
			</div>
			<!-- <transition-group name="slideup" class="allnotes_content">
					<div
						class="note_content"
						v-for="(item, index) in existingNotes"
						:key="'item' + index"
					>
						<p>{{ item.note }}</p>
					</div>
				</transition-group> -->
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		name: "Indication",
		computed: {
			...mapState(["country", "existingNotes", "notes", "countryHoverId"]),
		},
	};
</script>

<style>
	.country {
		position: absolute;
		/* top: 50%; */
		background: lightblue;
		width: 250px;
		height: 100vh;
		z-index: 100;
	}
	.country_title {
		text-align: center;
		font-size: 2rem;
	}
	.note_content {
		text-align: center;
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
</style>
