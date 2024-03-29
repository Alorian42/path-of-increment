import {
	ITEM_AFFIXES_GURANTEED,
	ITEM_RARITY,
	ITEM_RARITY_CHANCES,
	type ITEM_RARITY_TYPE_VALUE,
} from '../../config/item';
import { GLOBAL_LOOT_TABLE } from '../../config/loot';
import type Item from '../items/Item';
import type Player from '../player/Player';
import type Enemy from '../enemy/Enemy';

export class LootController {
	private player!: Player;

	public setPlayer(player: Player): void {
		this.player = player;
	}

	public generateItem(enemy?: Enemy): Item {
		const rarity = this.determineItemRarity();
		const itemLevel = this.determineItemLevel(enemy);
		const ItemBase = this.determineItemBase(enemy) as any;
		const item = new ItemBase(rarity, itemLevel);

		this.determineAffixes(item as Item);

		item.identify(); // @TODO: add mechanic to identify items

		return item;
	}

	private determineItemRarity(): ITEM_RARITY_TYPE_VALUE {
		const dice = Math.random();
		const config = ITEM_RARITY_CHANCES;
		let rarity: ITEM_RARITY_TYPE_VALUE = ITEM_RARITY.NORMAL;

		Object.entries(config).forEach(([rar, chance]) => {
			if (dice < chance) {
				rarity = rar as ITEM_RARITY_TYPE_VALUE;
			}
		});

		return rarity;
	}

	private determineItemLevel(enemy?: Enemy): number {
		const dice = Math.random();
		let itemLevel = enemy?.getLevel() ?? 99;

		if (dice < 0.01) {
			itemLevel += 2;
		} else if (dice < 0.1) {
			itemLevel += 1;
		}

		return itemLevel;
	}

	private determineItemBase(enemy?: Enemy): typeof Item {
		const lootTable = enemy?.getLootTable() ?? GLOBAL_LOOT_TABLE;

		// Get random item from loot table
		const item = lootTable[Math.floor(Math.random() * lootTable.length)] as unknown as typeof Item;

		if (item === undefined) {
			throw new Error('No item found in loot table');
		}

		return item;
	}

	private determineAffixes(item: Item): void {
		let config = ITEM_AFFIXES_GURANTEED[item.getRarity()];
		let prefixes = 0;
		let suffixes = 0;

		while (config > 0) {
			if (Math.random() < 0.5) {
				prefixes += 1;
			} else {
				suffixes += 1;
			}

			config -= 1;
		}

		item.addPrefixes(prefixes);
		item.addSuffixes(suffixes);
	}
}

const lootController = new LootController();
export default lootController;
