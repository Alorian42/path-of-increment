import Player from '../Player';

export default class PlayerController {
	private readonly player: Player = new Player('Witch', 'witch.png');

	public getPlayer(): Player {
		return this.player;
	}
}
