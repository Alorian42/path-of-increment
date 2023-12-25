import Player from '../player/Player';

export default class PlayerController {
	private readonly player: Player = new Player('Witch', 'occultist.png');

	public getPlayer(): Player {
		return this.player;
	}
}
