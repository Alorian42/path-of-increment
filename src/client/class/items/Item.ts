import { ITEM_IMPLICIT_LIMIT, ITEM_PREFIX_LIMIT, ITEM_SUFFIX_LIMIT } from '../../config/item';
import type Player from '../player/Player';
import type Affix from '../affixes/Affix';
import type { ITEM_RARITY_TYPE_VALUE } from '../../config/item';
import { AFFIXES_TYPES } from '../affixes/Affix';
import type Prefix from '../affixes/Prefix';
import type Suffix from '../affixes/Suffix';

export default abstract class Item {
	private readonly uuid: string;
	private readonly id: number;
	private readonly name: string;
	private readonly image: string;

	private readonly rarity: ITEM_RARITY_TYPE_VALUE;
	private readonly affixes: Affix[] = [];

	protected readonly prefixAffixPool: Array<typeof Prefix> = [];
	protected readonly suffixAffixPool: Array<typeof Suffix> = [];

	private readonly type: TYPE_HELPER;

	private readonly itemLevel: number;

	private identified = false;

	constructor(
		id: number,
		name: string,
		image: string,
		type: TYPE_HELPER,
		rarity: ITEM_RARITY_TYPE_VALUE,
		itemLevel: number
	) {
		this.uuid = crypto.randomUUID();
		this.id = id;
		this.name = name;
		this.image = image;
		this.type = type;
		this.rarity = rarity;
		this.itemLevel = itemLevel;

		this.setupPrefixPool();
		this.setupSuffixPool();

		this.addImplicits();
		this.addPrefixes();
		this.addSuffixes();
	}

	public getUUID(): string {
		return this.uuid;
	}

	public getName(): string {
		return this.name;
	}

	public getDescription(): string {
		let description = '';

		this.walkThroughAffixes(
			affix => {
				description += `${affix.toString()}<br>`;
			},
			() => {
				description += '<br>';
			}
		);

		return description;
	}

	public getImage(): URL {
		return new URL(`../../assets/items/${this.image}`, import.meta.url);
	}

	public getType(): TYPE_HELPER {
		return this.type;
	}

	public getRarity(): ITEM_RARITY_TYPE_VALUE {
		return this.rarity;
	}

	public getItemLevel(): number {
		return this.itemLevel;
	}

	public identify(): void {
		this.walkThroughAffixes(affix => {
			affix.assignValue();
		});

		this.identified = true;
	}

	public isIdentified(): boolean {
		return this.identified;
	}

	public equip(player: Player): void {
		this.walkThroughAffixes(affix => {
			affix.equip(player);
		});
	}

	public unequip(player: Player): void {
		this.walkThroughAffixes(affix => {
			affix.unequip(player);
		});
	}

	protected abstract addImplicits(): void;
	protected abstract setupPrefixPool(): void;
	protected abstract setupSuffixPool(): void;

	addPrefixesOrSuffixes(pool: Array<typeof Affix>, guranteed: number = 0, max: number = 0): void {
		let added = 0;
		if (pool.length === 0) {
			return;
		}

		// Add guaranteed prefixes
		for (let i = 0; i < guranteed; i += 1) {
			const affix = new (pool[Math.floor(Math.random() * pool.length)] as any)() as Prefix;
			this.addAffix(affix);
			added += 1;
		}

		// Add random prefixes until we reach the limit
		// Do a random 50/50 check
		let random = Math.random() >= 0.5;
		let affix = new (pool[Math.floor(Math.random() * pool.length)] as any)() as Prefix;
		while (random && this.canAddAffix(affix) && added < max) {
			this.addAffix(affix);
			affix = new (pool[Math.floor(Math.random() * pool.length)] as any)() as Prefix;
			added += 1;
			random = Math.random() >= 0.5;
		}
	}

	/**
	 * Add prefixes to the item
	 * Takes a guranteed amount of prefixes to add
	 * Gets prefixes from the prefix pool
	 */
	public addPrefixes(guranteed: number = 0, max: number = 0): void {
		this.addPrefixesOrSuffixes(this.prefixAffixPool, guranteed, max);
	}

	public addSuffixes(guranteed: number = 0, max: number = 0): void {
		this.addPrefixesOrSuffixes(this.suffixAffixPool, guranteed, max);
	}

	protected getAffixes(type: (typeof AFFIXES_TYPES)[keyof typeof AFFIXES_TYPES]): Affix[] {
		return this.affixes.filter(affix => affix.getType() === type);
	}

	protected walkThroughAffixes(callback: (affix: Affix) => void, callback2?: () => void): void {
		const implicits = this.getAffixes(AFFIXES_TYPES.IMPLICIT);
		if (implicits.length > 0) {
			implicits.forEach(callback);
			callback2?.();
		}

		const prefixes = this.getAffixes(AFFIXES_TYPES.PREFIX);
		if (prefixes.length > 0) {
			prefixes.forEach(callback);
			callback2?.();
		}

		const suffixes = this.getAffixes(AFFIXES_TYPES.SUFFIX);
		if (suffixes.length > 0) {
			suffixes.forEach(callback);
			callback2?.();
		}
	}

	protected getAffixLimits(): Record<string, number> {
		return {
			[AFFIXES_TYPES.IMPLICIT]: ITEM_IMPLICIT_LIMIT[this.rarity],
			[AFFIXES_TYPES.PREFIX]: ITEM_PREFIX_LIMIT[this.rarity],
			[AFFIXES_TYPES.SUFFIX]: ITEM_SUFFIX_LIMIT[this.rarity],
		};
	}

	protected canAddAffix(affix: Affix): boolean {
		const affixFamily = this.getAffixes(affix.getType());

		return affixFamily.length < this.getAffixLimits()[affix.getType()];
	}

	protected addAffix(affix: Affix): void {
		if (this.canAddAffix(affix)) {
			this.affixes.push(affix);
		}
	}
}

export const ITEM_TYPES = {
	HELMET: 'helmet',
	WEAPON: 'weapon',
	BODY_ARMOR: 'body_armor',
	GLOVES: 'gloves',
	BOOTS: 'boots',
	BELT: 'belt',
	RING: 'ring',
	AMULET: 'amulet',
} as const;

type TYPE_HELPER = (typeof ITEM_TYPES)[keyof typeof ITEM_TYPES];
