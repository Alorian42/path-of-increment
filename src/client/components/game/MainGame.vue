<template>
	<div class="main-game">
		<TopMenu />
		<div class="content">
			<Field v-if="currentMap" :map="currentMap" :player="currentPlayer" @finish="onFinish" />
			<MapSelect v-else :maps="mapPool" @start="onStart" />
			<Character :key="inventoryKey" :player="currentPlayer" />
		</div>
	</div>
</template>

<script lang="ts">
import { type Ref, computed, ref } from 'vue';
import Character from './Character.vue';
import Field from './Field.vue';
import TopMenu from './TopMenu.vue';
import MapSelect from '../Map/MapSelect.vue';
import mapControllerNonReactive from '../../class/controllers/MapController';
import playerControllerNonReactive from '../../class/controllers/PlayerController';
import inventoryController from '../../class/controllers/InventoryController';
import lootController from '../../class/controllers/LootController';
import engineController from '../../class/controllers/EngineController';
import '../../class/controllers/CurrencyController';
import type Map from '../../class/Map';
import { MAP_POOL } from '../../config/maps';

export default {
	components: {
		Character,
		Field,
		TopMenu,
		MapSelect,
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
			mapPool: MAP_POOL.map((Map: any) => new Map()), // @TODO filter by accessebility
			onStart: (map: Map) => {
				engineController.startMap(Object.getPrototypeOf(map).constructor as typeof Map);
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
	align-items: center;
	flex: 1;

	button {
		width: 100px;
		height: 50px;
		margin: auto;
	}
}

.character {
	flex: 1;
}

.field {
	flex: 1;
}
</style>
