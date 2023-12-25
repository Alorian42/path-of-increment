import { ITEM_IMPLICIT_LIMIT, ITEM_PREFIX_LIMIT, ITEM_SUFFIX_LIMIT } from '../../config/item';
import type Player from '../player/Player';
import type Affix from '../affixes/Affix';
import type { ITEM_RARITY_TYPE_VALUE } from '../../config/item';
import { AFFIXES_TYPES } from '../affixes/Affix';

export default abstract class Item {
	private readonly uuid: string;
	private readonly id: number;
	private readonly name: string;
	private readonly image: string;

	private readonly rarity: ITEM_RARITY_TYPE_VALUE;
	private readonly affixes: Affix[] = [];

	private readonly type: TYPE_HELPER;

	private identified = false;

	constructor(id: number, name: string, image: string, type: TYPE_HELPER, rarity: ITEM_RARITY_TYPE_VALUE) {
		this.uuid = crypto.randomUUID();
		this.id = id;
		this.name = name;
		this.image = image;
		this.type = type;
		this.rarity = rarity;

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
				description += `${affix.toString()}\n`;
			},
			() => {
				description += '\n';
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
	protected abstract addPrefixes(): void;
	protected abstract addSuffixes(): void;

	protected getAffixes(type: (typeof AFFIXES_TYPES)[keyof typeof AFFIXES_TYPES]): Affix[] {
		return this.affixes.filter(affix => affix.getType() === type);
	}

	protected walkThroughAffixes(callback: (affix: Affix) => void, callback2?: () => void): void {
		this.getAffixes(AFFIXES_TYPES.IMPLICIT).forEach(callback);
		callback2?.();
		this.getAffixes(AFFIXES_TYPES.PREFIX).forEach(callback);
		callback2?.();
		this.getAffixes(AFFIXES_TYPES.SUFFIX).forEach(callback);
		callback2?.();
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
