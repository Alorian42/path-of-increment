<template>
	<div class="game-field">
		<div class="zone">
			<!-- Zone content goes here -->
		</div>
		<div class="character">
			<!-- Character on the zone goes here -->
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: 'GameField',
};
</script>

<style scoped>
.game-field {
	width: 500px;
	height: 500px;
	border: 1px solid #ccc;
	position: relative;
}

.zone {
	width: 100%;
	height: 100%;
	background-color: #f0f0f0;
}

.character {
	width: 50px;
	height: 50px;
	background-color: #ff0000;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>
