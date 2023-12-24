<template>
	<div class="main-game">
		<TopMenu />
		<div class="content">
			<Field :map="currentMap" :player="currentPlayer" @move="onMove" />
			<Character :player="currentPlayer" />
			<button @click="test">Equip Boots</button>
			<button @click="test2">Unequip Boots</button>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import Character from './Character.vue';
import Field from './Field.vue';
import TopMenu from './TopMenu.vue';
import MapController from '../../class/controllers/MapController';
import PlayerController from '../../class/controllers/PlayerController';

export default {
	components: {
		Character,
		Field,
		TopMenu,
	},
	setup() {
		const mapController = ref(new MapController());
		const playerController = ref(new PlayerController());

		const currentMap = computed(() => {
			return mapController.value.getCurrentMap();
		});
		const currentPlayer = computed(() => {
			return playerController.value.getPlayer();
		});

		return {
			currentMap,
			currentPlayer,
			onMove(): void {
				mapController.value.goToMudFlats();
			},
			test(): void {
				playerController.value.test();
			},
			test2(): void {
				playerController.value.test2();
			},
		};
	},
};
</script>

<style>
.main-game {
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100vw;
}

.content {
	display: flex;
	justify-content: space-between;
	flex: 1;
}

.character {
	flex: 1;
}

.field {
	flex: 1;
}
</style>
