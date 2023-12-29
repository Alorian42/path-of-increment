import type { ITEM_RARITY_TYPE_VALUE } from '../../config/item';

// eslint-disable-next-line import/no-cycle
import AffixUser from '../AffixUser';

export default abstract class Item extends AffixUser {
	private readonly name: string;
	private readonly image: string;
	private readonly type: TYPE_HELPER;
	constructor(
		name: string,
		image: string,
		type: TYPE_HELPER,
		rarity: ITEM_RARITY_TYPE_VALUE,
		itemLevel: number
	) {
		super(rarity, itemLevel);

		this.name = name;
		this.image = image;
		this.type = type;
	}

	public getName(): string {
		return `(${super.getName()}) ${this.name}`;
	}

	public getImage(): URL {
		return new URL(`../../assets/items/${this.image}`, import.meta.url);
	}

	public getType(): TYPE_HELPER {
		return this.type;
	}

	protected abstract addImplicits(): void;
	protected abstract setupPrefixPool(): void;
	protected abstract setupSuffixPool(): void;
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
