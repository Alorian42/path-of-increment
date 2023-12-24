<template>
	<div class="menu">
		<h1>Welcome to the Game Menu</h1>
		<ul>
			<li><span @click="startGame">Start Game</span></li>
			<li><router-link :to="{ name: 'options' }">Options</router-link></li>
			<li><span @click="closeWindow">Exit</span></li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const startGame = (): void => {
	console.log('Starting game...');
	router.push({ name: 'game' }).catch(err => {
		console.error(err);
	});
};
</script>

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
