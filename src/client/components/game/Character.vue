<template>
	<div class="game-character">
		<h1>Game Character Screen</h1>
		<inventory :player="player" />
		<div class="character-stats">
			<h2>Stats</h2>
			<div>Strength: {{ player.strength }}</div>
			<div>Dexterity: {{ player.dexterity }}</div>
			<div>Intelligence: {{ player.intelligence }}</div>
			<div>Physical Damage: {{ player.physicalDamageMin }} - {{ player.physicalDamageMax }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import Inventory from '../inventory/Inventory.vue';
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
	components: {
		Inventory,
	},
};
</script>

<style scoped>
.game-character {
	min-width: 500px;
	max-width: 500px;
}
</style>
