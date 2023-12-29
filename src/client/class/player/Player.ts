import StatUser from '../StatUser';
import type Item from '../items/Item';
import { ITEM_TYPES } from '../items/Item';
import PlayerStats from './PlayerStats';
import type { PLAYER_STATS_TYPE_HELPER } from './PlayerStats';

type ITEM_TYPES_HELPER = (typeof ITEM_TYPES)[keyof typeof ITEM_TYPES];

export default class Player extends StatUser {
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

	protected stats: Record<PLAYER_STATS_TYPE_HELPER, number> = PlayerStats.getDefaults();

	constructor(name: string, image: string) {
		super();

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
		return parseFloat(
			Number((this.stats.strength + this.stats.additionalStrength) * this.stats.multiplierStrength).toFixed(
				2
			)
		);
	}

	public get dexterity(): number {
		return parseFloat(
			Number(
				(this.stats.dexterity + this.stats.additionalDexterity) * this.stats.multiplierDexterity
			).toFixed(2)
		);
	}

	public get intelligence(): number {
		return parseFloat(
			Number(
				(this.stats.intelligence + this.stats.additionalIntelligence) * this.stats.multiplierIntelligence
			).toFixed(2)
		);
	}

	public get physicalDamageMin(): number {
		return parseFloat(
			Number(
				(this.stats.physicalDamageMin + this.stats.additionalPhysicalDamageMin) *
					this.stats.multiplierPhysicalDamageMin
			).toFixed(2)
		);
	}

	public get physicalDamageMax(): number {
		return parseFloat(
			Number(
				(this.stats.physicalDamageMax + this.stats.additionalPhysicalDamageMax) *
					this.stats.multiplierPhysicalDamageMax
			).toFixed(2)
		);
	}

	public get physicalDamage(): number {
		return (this.physicalDamageMin + this.physicalDamageMax) / 2;
	}

	public calculateDamage(): number {
		return Math.floor((this.physicalDamageMin + this.physicalDamageMax) / 2);
	}

	public calculateDefense(): number {
		return 1;
	}

	public calculateSpeed(): number {
		return 1;
	}
}
