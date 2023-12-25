import BodyArmor from '../../class/items/BodyArmor';
import type { ITEM_RARITY_TYPE_VALUE } from '../../config/item';
import DexterityBonusSmall from '../affixes/implicits/DexterityBonusSmall';
import MinPhysDmgMultiSmall from '../affixes/prefixes/MinPhysDmgMultiSmall';
import MinPhysDmgSmall from '../affixes/prefixes/MinPhysDmgSmall';
import MaxPhysDmgMultiSmall from '../affixes/suffixes/MaxPhysDmgMultiSmall';
import MaxPhysDmgSmall from '../affixes/suffixes/MaxPhysDmgSmall';

export default class LeatherChest extends BodyArmor {
	constructor(rarity: ITEM_RARITY_TYPE_VALUE, itemLevel: number) {
		super(2, 'Leather Chest', 'leather_chest.png', rarity, itemLevel);
	}

	protected addImplicits(): void {
		this.addAffix(new DexterityBonusSmall());
	}

	protected setupPrefixPool(): void {
		this.prefixAffixPool.push(MinPhysDmgSmall, MinPhysDmgMultiSmall);
	}

	protected setupSuffixPool(): void {
		this.suffixAffixPool.push(MaxPhysDmgSmall, MaxPhysDmgMultiSmall);
	}
}