import type Item from '../items/Item';
import type { ITEM_TYPES } from '../items/Item';
import Stats from './Stats';
import type { PLAYER_STATS_TYPE_HELPER } from './Stats';

export default class Player {
	private readonly name: string;
	private readonly image: string;

	private readonly items: Record<Partial<(typeof ITEM_TYPES)[keyof typeof ITEM_TYPES]>, Item | undefined> = {};
	private readonly stats: Record<PLAYER_STATS_TYPE_HELPER, number> = Stats.getDefaults();

	constructor(name: string, image: string) {
		this.name = name;
		this.image = image;
	}

	public getName(): string {
		return this.name;
	}

	public getImage(): URL {
		return new URL(`../../assets/players/${this.image}`, import.meta.url);
	}

	public equip(item: Item): void {
		this.items[item.getType()]?.unequip(this);
		this.items[item.getType()] = item;

		item.equip(this);
	}

	public unequip(type: (typeof ITEM_TYPES)[keyof typeof ITEM_TYPES]): void {
		this.items[type]?.unequip(this);
		this.items[type] = undefined;
	}

	public modifyStat(stat: PLAYER_STATS_TYPE_HELPER, value: number): void {
		this.stats[stat] += value;
	}

	public getStats(): Record<PLAYER_STATS_TYPE_HELPER, number> {
		return this.stats;
	}
}
