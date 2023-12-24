<template>
	<div class="menu">
		<h1>Welcome to the Game Menu</h1>
		<ul>
			<li><a href="#">Start Game</a></li>
			<li><router-link :to="{ name: 'options' }">Options</router-link></li>
			<li><a href="#">Exit</a></li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Menu',
}
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
