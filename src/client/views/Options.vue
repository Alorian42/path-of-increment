<template>
	<div class="options">
		<h1>Options</h1>
		<!-- Add your options here -->
		<router-link :to="{ name: 'main-menu' }">Go back to Main Menu</router-link>
	</div>
</template>

<script>
export default {
	name: "Options",
}
</script>

<style scoped>
.options {
	/* Add your styles here */
}
</style>
