import LeatherBoots from '../../data/items/LeatherBoots';
import type Item from '../items/Item';
import type Player from '../player/Player';

export class LootController {
	private player!: Player;

	public setPlayer(player: Player): void {
		this.player = player;
	}

	public generateItem(): Item {
		const rarity = 'normal'; // @TODO: randomize
		const itemLevel = 10; // @TODO: randomize
		const item = new LeatherBoots(rarity, itemLevel); // @TODO: randomize

		item.identify(); // @TODO: add mechanic to identify items

		return item;
	}
}

const lootController = new LootController();
export default lootController;
