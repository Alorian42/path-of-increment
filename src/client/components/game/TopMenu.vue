<template>
	<div class="top-menu">
		<div class="currency-info">
			<currency-item v-for="currency in currencies" :key="currency.getType()" :currency="currency" />
			<router-link :to="{ name: 'main-menu' }">Go back to Main Menu</router-link>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import CurrencyItem from '../currency/CurrencyItem.vue';
import currencyController from '../../class/controllers/CurrencyController';
import type Currency from '../../class/Currency';

const currencies = reactive(currencyController.getCurrencies()) as Currency[];
</script>

<script lang="ts">
export default {
	name: 'TopMenu',
	components: {
		CurrencyItem,
	},
};
</script>

<style scoped>
.top-menu {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	background-color: #f2f2f2;
}

.currency-info {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

h2 {
	margin-bottom: 10px;
}
</style>
