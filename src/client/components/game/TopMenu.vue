<template>
	<div class="top-menu">
		<div class="character-info">
			<h2>Character Information</h2>
			<!-- Display character information here -->
		</div>
		<div class="currency-info">
			<h2>Currency Information</h2>
			<!-- Display currency information here -->
		</div>
		<router-link :to="{ name: 'main-menu' }">Go back to Main Menu</router-link>
	</div>
</template>

<script lang="ts">
export default {
	name: 'TopMenu',
	// Add component logic here
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

.character-info,
.currency-info {
	flex: 1;
	margin: 0 10px;
}

h2 {
	margin-bottom: 10px;
}
</style>
