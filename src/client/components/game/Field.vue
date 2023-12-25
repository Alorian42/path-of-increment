<template>
	<div class="game-field">
		<div class="label">{{ map.getName() }} {{ Number(timeToEnd / 1000 + 1).toFixed(0) }} seconds left</div>
		<div class="map" :style="mapStyle" />
		<div class="character" :style="characterStyle" />
	</div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { PropType } from 'vue';
import type Map from '../../class/Map';
import type Player from '../../class/player/Player';

const props = defineProps({
	map: {
		type: Object as PropType<Map>,
		required: true,
	},
	player: {
		type: Object as PropType<Player>,
		required: true,
	},
});

const emit = defineEmits(['finish']);

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

watch(timeToEnd, value => {
	if (value <= 0) {
		emit('finish');
	}
});
</script>

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
	position: absolute;
	background: white;
	padding: 10px;
}
</style>
../../class/player/Player
