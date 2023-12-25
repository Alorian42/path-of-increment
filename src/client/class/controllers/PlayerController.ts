import Player from '../player/Player';

class PlayerController {
	private readonly player: Player = new Player('Witch', 'occultist.png');

	public getPlayer(): Player {
		return this.player;
	}
}

const playerController = new PlayerController();
export default playerController;
