import type Item from '../items/Item';
import { ITEM_TYPES } from '../items/Item';
import Stats from './Stats';
import type { PLAYER_STATS_TYPE_HELPER } from './Stats';

type ITEM_TYPES_HELPER = (typeof ITEM_TYPES)[keyof typeof ITEM_TYPES];

export default class Player {
	private readonly name: string;
	private readonly image: string;

	private readonly items: {
		[key in ITEM_TYPES_HELPER]?: Item;
	} = Array.from(Object.values(ITEM_TYPES)).reduce(
		(
			acc: {
				[key in ITEM_TYPES_HELPER]?: Item;
			},
			type: ITEM_TYPES_HELPER
		) => {
			acc[type] = undefined;
			return acc;
		},
		{}
	);

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

	public getEquippedItem(type: (typeof ITEM_TYPES)[keyof typeof ITEM_TYPES]): Item | undefined {
		return this.items[type];
	}

	public getItems(): {
		[key in ITEM_TYPES_HELPER]?: Item;
	} {
		return this.items;
	}

	public get strength(): number {
		return (this.stats.strength + this.stats.additionalStrength) * this.stats.multiplierStrength;
	}

	public get dexterity(): number {
		return (this.stats.dexterity + this.stats.additionalDexterity) * this.stats.multiplierDexterity;
	}

	public get intelligence(): number {
		return (this.stats.intelligence + this.stats.additionalIntelligence) * this.stats.multiplierIntelligence;
	}

	public get physicalDamageMin(): number {
		return (
			// Get base min physical damage and add additional min physical damage
			(this.stats.physicalDamageMin + this.stats.additionalPhysicalDamageMin) *
			// Multiply by physical damage multiplier
			this.stats.multiplierPhysicalDamageMin
		);
	}

	public get physicalDamageMax(): number {
		return (
			// Get base max physical damage and add additional max physical damage
			(this.stats.physicalDamageMax + this.stats.additionalPhysicalDamageMax) *
			// Multiply by physical damage multiplier
			this.stats.multiplierPhysicalDamageMax
		);
	}

	public calculateDamage(): number {
		return Math.floor(
			Math.random() * (this.physicalDamageMax - this.physicalDamageMin + 1) + this.physicalDamageMin
		);
	}
}
