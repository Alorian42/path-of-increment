<template>
	<div class="inventory">
		<h2>Equipped</h2>
		<div class="equipped-wrapper">
			<div v-for="type in itemTypes" :key="type">
				{{ type }}
				<inventory-tile :item="player.getEquippedItem(type)" is-equipped @unequip="onUnequip" />
			</div>
		</div>

		<h2>Inventory</h2>
		<div class="inventory-wrapper">
			<inventory-tile
				v-for="(item, index) in inventory"
				:key="index"
				:item="item"
				is-inventory
				@equip="onEquip"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import type { PropType } from 'vue';
import type Player from '../../class/player/Player';
import type Item from '../../class/items/Item';
import InventoryTile from './InventoryTile.vue';
import type { ITEM_TYPES } from '../../class/items/Item';
import inventoryController from '../../class/controllers/InventoryController';

const props = defineProps({
	player: {
		type: Object as PropType<Player>,
		required: true,
	},
});

const onEquip = (item?: Item): void => {
	if (item !== undefined) {
		inventoryController.equipItem(item);
	}
};

const onUnequip = (type: (typeof ITEM_TYPES)[keyof typeof ITEM_TYPES]): void => {
	inventoryController.unequipItem(type);
};

const inventory = reactive(inventoryController.getInventory()) as Item[];
const items = reactive(props.player.getItems()) as {
	[key in (typeof ITEM_TYPES)[keyof typeof ITEM_TYPES]]: Item;
};
const itemTypes = computed(() => {
	return Object.keys(items) as Array<(typeof ITEM_TYPES)[keyof typeof ITEM_TYPES]>;
});
</script>

<script lang="ts">
export default {
	name: 'CharacterInventory',
	components: {
		InventoryTile,
	},
};
</script>

<style scoped>
.equipped-wrapper {
	display: flex;
	gap: 20px;
	flex-wrap: wrap;
}

.inventory-wrapper {
	display: flex;
	gap: 5px;
	flex-wrap: wrap;
}
</style>
