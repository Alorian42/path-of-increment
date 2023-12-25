<template>
	<div class="currency-item">
		<div class="currency-item-image" :style="imageStyles" />
		<div class="currency-item-tooltip">
			<div class="currency-item-tooltip-content">
				<div class="currency-item-tooltip-title">{{ currency.getName() }}</div>
				<div class="currency-item-tooltip-description">{{ currency.getDescription() }}</div>
			</div>
		</div>
		<div class="currency-item-amount">{{ getAmount(currency.getType()) }}</div>
	</div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';
import type Currency from '../../class/Currency';
import type { CURRENCY_TYPES_HELPER } from '../../config/currency';
import currencyController from '../../class/controllers/CurrencyController';

const props = defineProps({
	currency: {
		type: Object as PropType<Currency>,
		required: true,
	},
});

const getAmount = (type: CURRENCY_TYPES_HELPER): number => {
	return currencyController.bank[type];
};

const imageStyles = computed(() => {
	return {
		backgroundImage: `url(${props.currency.getImage().href})`,
	};
});
</script>

<style scoped>
.currency-item {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	border: 1px solid #ccc;
	position: relative;
}

.currency-item-image {
	width: 50px;
	height: 50px;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	cursor: pointer;
}

.currency-item-image:hover + .currency-item-tooltip {
	display: block;
}

.currency-item-tooltip {
	display: none;
	position: absolute;
	width: 100px;
	top: 100%;
	left: 0;
	background-color: #fff;
	border: 1px solid #ccc;
	z-index: 100;
	text-align: center;
}
</style>
