import { ITEM_IMPLICIT_LIMIT, ITEM_PREFIX_LIMIT, ITEM_SUFFIX_LIMIT } from '../../config/item';
import type Player from '../player/Player';
import type Affix from '../affixes/Affix';
import type { ITEM_RARITY_TYPE_VALUE } from '../../config/item';
import { AFFIXES_TYPES } from '../affixes/Affix';

export default abstract class Item {
	private readonly id: number;
	private readonly name: string;
	private readonly image: string;

	private readonly rarity: ITEM_RARITY_TYPE_VALUE;
	private readonly affixes: Affix[] = [];

	private readonly type: TYPE_HELPER;

	private identified = false;

	constructor(id: number, name: string, image: string, type: TYPE_HELPER, rarity: ITEM_RARITY_TYPE_VALUE) {
		this.id = id;
		this.name = name;
		this.image = image;
		this.type = type;
		this.rarity = rarity;

		this.addImplicits();
	}

	public getName(): string {
		return this.name;
	}

	public getImage(): URL {
		return new URL(`../assets/items/${this.image}`, import.meta.url);
	}

	public getType(): TYPE_HELPER {
		return this.type;
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

	protected getAffixes(type: (typeof AFFIXES_TYPES)[keyof typeof AFFIXES_TYPES]): Affix[] {
		return this.affixes.filter(affix => affix.getType() === type);
	}

	protected walkThroughAffixes(callback: (affix: Affix) => void): void {
		this.getAffixes(AFFIXES_TYPES.IMPLICIT).forEach(callback);
		this.getAffixes(AFFIXES_TYPES.PREFIX).forEach(callback);
		this.getAffixes(AFFIXES_TYPES.SUFFIX).forEach(callback);
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
	BODY_ARMOR: 'body_armor',
	WEAPON: 'weapon',
	BOOTS: 'boots',
};

type TYPE_HELPER = (typeof ITEM_TYPES)[keyof typeof ITEM_TYPES];
