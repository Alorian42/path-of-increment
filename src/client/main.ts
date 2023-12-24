import { createApp } from 'vue';
import './style.css';
import Game from './Game.vue';
import Router from './router';

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const game = createApp(Game);
game.use(Router);
game.mount('#game');
