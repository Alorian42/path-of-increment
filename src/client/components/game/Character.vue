<template>
	<div class="game-character">
		<h1>Game Character Screen</h1>
		<div class="character-stats">
			<h2>Stats</h2>
			<div v-for="(value, name) in player.getStats()" :key="name" class="stat">{{ name }}: {{ value }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { PropType } from 'vue';
import type Player from '../../class/player/Player';

defineProps({
	player: {
		type: Object as PropType<Player>,
		required: true,
	},
});
</script>

<script lang="ts">
export default {
	name: 'GameCharacter',
};
</script>

<style scoped>
/* Component styles go here */
</style>
