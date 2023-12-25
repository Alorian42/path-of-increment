<template>
	<div class="tile" @click="onClick">
		<div class="item-image" :class="{ 'item-image--equipped': item }" :style="styles" />
		<div v-if="item" class="tooltip">
			<div class="tooltip-content">
				<div class="tooltip-title" :style="tooltipTitleStyle">
					{{ item.getName() }} ({{ item.getItemLevel() }})
				</div>
				<div class="tooltip-description" v-html="item.getDescription()" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import type Item from '../../class/items/Item';
import { ITEM_COLOR } from '../../config/item';

const props = defineProps({
	item: {
		type: Object as PropType<Item>,
		default: undefined,
	},
	isInventory: {
		type: Boolean,
		default: false,
	},
	isEquipped: {
		type: Boolean,
		default: false,
	},
});

const emits = defineEmits(['unequip', 'equip']);

const styles = computed(() => {
	if (props.item === undefined) {
		return {
			backgroundImage: `url(${new URL('../../assets/items/empty.png', import.meta.url).href})`,
		};
	}

	return {
		backgroundImage: `url(${props.item.getImage().href})`,
	};
});

const tooltipTitleStyle = computed(() => {
	if (props.item === undefined) {
		return {};
	}

	return {
		color: ITEM_COLOR[props.item.getRarity()],
	};
});

const onClick = (): void => {
	if (props.isInventory) {
		emits('equip', props.item);
	} else if (props.isEquipped) {
		emits('unequip', props.item?.getType());
	}
};
</script>

<script lang="ts">
export default {
	name: 'InventoryTile',
};
</script>

<style scoped>
.tile {
	width: 50px;
	height: 50px;
	border: 1px solid #ccc;
	position: relative;
}

.item-image {
	width: 100%;
	height: 100%;
	background-size: contain;
}

.item-image--equipped {
	cursor: pointer;
}

.tooltip {
	display: none;
	position: absolute;
	top: 100%;
	left: -125px;
	width: 300px;
	background-color: #fff;
	border: 1px solid #ccc;
}

.item-image:hover + .tooltip {
	display: block;
	z-index: 100;
}
</style>
