import Enemy from '../../class/enemy/Enemy';
import type Item from '../../class/items/Item';
import { type ITEM_RARITY_TYPE_VALUE } from '../../config/item';

export default class ZombieEnemy extends Enemy {
	public constructor(level: number, rarity: ITEM_RARITY_TYPE_VALUE, lootTable: Array<typeof Item>) {
		super('Zombie', 'zombie.png', level, rarity, lootTable);

		this.modifyStat('life', 9);
		this.modifyStat('damage', 3);
		this.modifyStat('armor', 4);
	}
}
