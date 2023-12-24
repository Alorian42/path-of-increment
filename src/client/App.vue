<template>
	<div>
		<a href="https://vuejs.org/" target="_blank">
			<img src="./assets/vue.svg" class="logo logo--red vue" alt="Vue logo" />
		</a>
		<div class="please please--red">123</div>
	</div>
	<HelloWorld msg="Vite + Vue + Me" />
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
</script>

<style scoped>
.please {
	color: black;

	&div {
		color: red;
	}
}
</style>
