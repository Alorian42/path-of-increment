<template>
	<div class="game-view">
		<MainGame />
	</div>
</template>

<script lang="ts">
import MainGame from '../components/game/MainGame.vue';

export default {
	name: 'GameView',
	components: {
		MainGame,
	},
};
</script>

<style scoped>
.game-view {
	width: 100%;
	height: 100%;
}
</style>
