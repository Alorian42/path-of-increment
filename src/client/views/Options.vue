<template>
	<div class="options">
		<h1>Options</h1>
		<!-- Add your options here -->
		<router-link :to="{ name: 'main-menu' }">Go back to Main Menu</router-link>
	</div>
</template>

<script lang="ts">
export default {
	name: 'GameOptions',
};
</script>

<style scoped>
.options {
	/* Add your styles here */
}
</style>
