<template>
	<div class="game-field">
		<div class="label">
			{{ map.getName() }}
			<div>{{ Number(timeToEnd / 1000 + 1).toFixed(0) }} seconds left</div>
			<div v-html="zone.getDescription()" />
		</div>
		<div class="field">
			<div class="map" :style="mapStyle" />
			<div class="character" :style="characterStyle" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { PropType } from 'vue';
import type Map from '../../class/map/Map';
import type Player from '../../class/player/Player';
import type MapZone from '../../class/map/MapZone';

const props = defineProps({
	map: {
		type: Object as PropType<Map>,
		required: true,
	},
	zone: {
		type: Object as PropType<MapZone>,
		required: true,
	},
	player: {
		type: Object as PropType<Player>,
		required: true,
	},
});

const mapStyle = computed(() => {
	return {
		backgroundImage: `url(${props.map.getImage().href})`,
	};
});

const characterStyle = computed(() => {
	return {
		backgroundImage: `url(${props.player.getImage().href})`,
	};
});

const currentTime = ref(Date.now());

const timeToEnd = computed(() => {
	return props.map.endTimestamp - currentTime.value;
});

setInterval(() => {
	currentTime.value = Date.now();
}, 1000);
</script>

<script lang="ts">
export default {
	name: 'GameField',
};
</script>

<style scoped>
.game-field {
	border: 1px solid #ccc;
}

.field {
	width: 500px;
	height: 500px;
	position: relative;
}

.map {
	width: 100%;
	height: 100%;
}

.character {
	position: absolute;
	bottom: 0;
	right: 0;
	width: 150px;
	height: 150px;
	background-size: contain;
}

.label {
	background: white;
	padding: 10px;
}
</style>
