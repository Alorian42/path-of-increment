<template>
	<div class="menu">
		<h1>Welcome to the Game Menu</h1>
		<ul>
			<li><router-link :to="{ name: 'game' }">Start Game</router-link></li>
			<li><router-link :to="{ name: 'options' }">Options</router-link></li>
			<li><span @click="closeWindow">Exit</span></li>
		</ul>
	</div>
</template>

<script lang="ts">
export default {
	name: 'MainMenu',
	methods: {
		closeWindow() {
			if (window.confirm('Are you sure you want to exit?')) {
				window.close();
			}
		},
	},
};
</script>

<style scoped>
.menu {
	text-align: center;
}

h1 {
	font-size: 24px;
	margin-bottom: 20px;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	margin-bottom: 10px;
}

a {
	text-decoration: none;
	color: #333;
	font-weight: bold;
}

a:hover {
	color: #666;
}
</style>
