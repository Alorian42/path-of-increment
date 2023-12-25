<template>
	<div class="main-game">
		<TopMenu />
		<div class="content">
			<Field v-if="currentMap" :map="currentMap" :player="currentPlayer" @finish="onFinish" />
			<button @click="onStart">Start Map</button>
			<Character :key="inventoryKey" :player="currentPlayer" />
		</div>
	</div>
</template>

<script lang="ts">
import { type Ref, computed, ref } from 'vue';
import Character from './Character.vue';
import Field from './Field.vue';
import TopMenu from './TopMenu.vue';
import mapControllerNonReactive from '../../class/controllers/MapController';
import playerControllerNonReactive from '../../class/controllers/PlayerController';
import inventoryController from '../../class/controllers/InventoryController';
import lootController from '../../class/controllers/LootController';
import engineController from '../../class/controllers/EngineController';
import '../../class/controllers/CurrencyController';
import ShoreMap from '../../data/maps/Shore';
import type Map from '../../class/Map';

export default {
	components: {
		Character,
		Field,
		TopMenu,
	},
	setup() {
		const mapController = ref(mapControllerNonReactive);
		const playerController = ref(playerControllerNonReactive);
		const inventoryKey = ref(0);

		inventoryController.setPlayer(playerController.value.getPlayer());
		lootController.setPlayer(playerController.value.getPlayer());

		engineController.init();

		const currentMap = ref(null) as Ref<Map | null>;
		const currentPlayer = computed(() => {
			return playerController.value.getPlayer();
		});

		return {
			currentMap,
			currentPlayer,
			inventoryKey,
			onStart: () => {
				engineController.startMap(ShoreMap);
				currentMap.value = mapController.value.getCurrentMap();
			},
			onFinish: () => {
				engineController.finishMap();
				currentMap.value = null;
				inventoryKey.value += 1;
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
