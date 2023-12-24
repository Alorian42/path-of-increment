<template>
	<div class="main-game">
		<TopMenu />
		<div class="content">
			<Field />
			<Character />
		</div>
	</div>
</template>

<script lang="ts">
import Character from './Character.vue';
import Field from './Field.vue';
import TopMenu from './TopMenu.vue';

export default {
	components: {
		Character,
		Field,
		TopMenu,
	},
};
</script>

<style>
.main-game {
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100vw;
}

.content {
	display: flex;
	justify-content: space-between;
	flex: 1;
}

.character {
	flex: 1;
}

.field {
	flex: 1;
}
</style>
