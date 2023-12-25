<template>
	<div class="main-game">
		<TopMenu />
		<div class="content">
			<Field :map="currentMap" :player="currentPlayer" @move="onMove" />
			<Character :player="currentPlayer" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import Character from './Character.vue';
import Field from './Field.vue';
import TopMenu from './TopMenu.vue';
import mapControllerNonReactive from '../../class/controllers/MapController';
import playerControllerNonReactive from '../../class/controllers/PlayerController';
import inventoryController from '../../class/controllers/InventoryController';
import lootController from '../../class/controllers/LootController';
import engineController from '../../class/controllers/EngineController';
import '../../class/controllers/CurrencyController';

export default {
	components: {
		Character,
		Field,
		TopMenu,
	},
	setup() {
		const mapController = ref(mapControllerNonReactive);
		const playerController = ref(playerControllerNonReactive);

		inventoryController.setPlayer(playerController.value.getPlayer());
		lootController.setPlayer(playerController.value.getPlayer());

		engineController.init();

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
