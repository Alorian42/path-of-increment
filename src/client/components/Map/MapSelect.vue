<template>
	<div class="map-select">
		<h2>Choose a map</h2>
		<div class="map-select-wrapper">
			<div v-for="map in maps" :key="map.getName()" class="map-select-item" @click="onStart(map)">
				<img :src="map.getImage().href" />
				{{ map.getName() }} {{ map.getLevel() }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import type Map from '../../class/Map';

defineProps({
	maps: {
		type: Array as PropType<Map[]>,
		default: () => [],
	},
});
const emits = defineEmits(['start']);

const onStart = (map: Map): void => {
	emits('start', map);
};
</script>

<style scoped>
.map-select {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.map-select-wrapper {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 1px solid #ccc;
		padding: 10px;
		margin: 10px;
		cursor: pointer;
	}

	img {
		width: 100px;
		height: 100px;
		margin: 10px;
		cursor: pointer;
	}
}
</style>
