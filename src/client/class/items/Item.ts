import { ITEM_IMPLICIT_LIMIT, ITEM_PREFIX_LIMIT, ITEM_SUFFIX_LIMIT } from '../../config/item';
import type Player from '../player/Player';
import type Affix from '../affixes/Affix';
import { AFFIXES_TYPES } from '../affixes/Affix';

export default abstract class Item {
	private readonly id: number;
	private readonly name: string;
	private readonly image: string;

	private readonly affixes: Affix[] = [];

	private readonly type: TYPE_HELPER;

	private identified = false;

	constructor(id: number, name: string, image: string, type: TYPE_HELPER) {
		this.id = id;
		this.name = name;
		this.image = image;
		this.type = type;
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
		this.getAffixes(AFFIXES_TYPES.IMPLICIT).forEach(affix => {
			affix.assignValue();
		});
		this.getAffixes(AFFIXES_TYPES.PREFIX).forEach(affix => {
			affix.assignValue();
		});
		this.getAffixes(AFFIXES_TYPES.SUFFIX).forEach(affix => {
			affix.assignValue();
		});

		this.identified = true;
	}

	public equip(player: Player): void {
		this.getAffixes(AFFIXES_TYPES.IMPLICIT).forEach(affix => {
			affix.equip(player);
		});

		this.getAffixes(AFFIXES_TYPES.PREFIX).forEach(affix => {
			affix.equip(player);
		});

		this.getAffixes(AFFIXES_TYPES.SUFFIX).forEach(affix => {
			affix.equip(player);
		});
	}

	public unequip(player: Player): void {
		this.getAffixes(AFFIXES_TYPES.IMPLICIT).forEach(affix => {
			affix.unequip(player);
		});

		this.getAffixes(AFFIXES_TYPES.PREFIX).forEach(affix => {
			affix.unequip(player);
		});

		this.getAffixes(AFFIXES_TYPES.SUFFIX).forEach(affix => {
			affix.unequip(player);
		});
	}

	protected getAffixes(type: (typeof AFFIXES_TYPES)[keyof typeof AFFIXES_TYPES]): Affix[] {
		return this.affixes.filter(affix => affix.getType() === type);
	}

	protected static getAffixLimits(): Record<string, number> {
		return {
			[AFFIXES_TYPES.IMPLICIT]: ITEM_IMPLICIT_LIMIT,
			[AFFIXES_TYPES.PREFIX]: ITEM_PREFIX_LIMIT,
			[AFFIXES_TYPES.SUFFIX]: ITEM_SUFFIX_LIMIT,
		};
	}

	protected canAddAffix(affix: Affix): boolean {
		const affixFamily = this.getAffixes(affix.getType());

		return affixFamily.length < Item.getAffixLimits()[affix.getType()];
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
