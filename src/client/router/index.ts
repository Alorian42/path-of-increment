import { createRouter, createWebHistory } from 'vue-router';
import Menu from '../views/Menu.vue';
import Options from '../views/Options.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'main-menu',
			component: Menu,
		},
		{
			path: '/options',
			name: 'options',
			component: Options,
		},
	],
});

export default router;
