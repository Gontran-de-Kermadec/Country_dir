<template>
	<div class="container">
		<div class="note">
			<label for="note">Remarque</label>
			<input type="text" name="note" id="note" />
			<label for="long_note">Remarque</label>
			<textarea name="long_note" id="long_note" cols="30" rows="10"></textarea>
		</div>
		<button>Fermer</button>
	</div>
</template>

<script>
	import { gsap } from "gsap";
	export default {
		name: "Country",
		methods: {
			animFadeIn() {
				const tl = gsap.timeline();
				tl.to(".container", { x: -300, duration: 1 });
				//tl.to(".country", { x: 0, width: 1000, duration: 1, zIndex: 100 });
			},
		},
	};
</script>

<style scoped>
	.container {
		position: absolute;
		right: 100;
		/* top: 50%; */
		background: lightblue;
		width: 600px;
		height: 100vh;
		z-index: 100;
	}
</style>
