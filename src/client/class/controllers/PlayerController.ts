import LeatherBoots from '../../data/items/LeatherBoots';
import Player from '../player/Player';

export default class PlayerController {
	private readonly player: Player = new Player('Witch', 'occultist.png');

	public getPlayer(): Player {
		return this.player;
	}

	public test(): void {
		const boots = new LeatherBoots('normal');
		boots.identify();

		this.player.equip(boots);
	}

	public test2(): void {
		this.player.unequip('boots');
	}
}
