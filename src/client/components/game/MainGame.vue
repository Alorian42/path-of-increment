<template>
	<div class="main-game">
		<TopMenu />
		<div class="content">
			<Field
				v-if="currentMap && currentZone"
				:map="currentMap"
				:zone="currentZone"
				:player="currentPlayer"
			/>
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
import type Map from '../../class/map/Map';
import { MAP_POOL } from '../../config/maps';
import type MapZone from '../../class/map/MapZone';
import EventBus from '../../class/EventBus/EventBus';
import MapFinishEvent from '../../class/EventBus/MapFinishEvent';
import UpdateInventoryEvent from '../../class/EventBus/UpdateInventoryEvent';

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
		const currentZone = ref(null) as Ref<MapZone | null>;
		const currentPlayer = computed(() => {
			return playerController.value.getPlayer();
		});

		EventBus.getInstance().subscribe(new MapFinishEvent(), () => {
			currentMap.value = null;
		});

		EventBus.getInstance().subscribe(new UpdateInventoryEvent(), () => {
			inventoryKey.value += 1;
		});

		return {
			currentMap,
			currentZone,
			currentPlayer,
			inventoryKey,
			mapPool: MAP_POOL.map((Map: any) => new Map()), // @TODO filter by accessebility
			onStart: (map: Map) => {
				engineController.startMap(Object.getPrototypeOf(map).constructor as typeof Map);
				currentMap.value = mapController.value.getCurrentMap();
				currentZone.value = mapController.value.getCurrentZone();
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
