import EntityRegisterController from '../../class/controllers/EntityRegisterController';
import Weapon from '../../class/items/Weapon';
import type { ITEM_RARITY_TYPE_VALUE } from '../../config/item';
import DexterityBonusSmall from '../affixes/player/implicits/DexterityBonusSmall';
import MinPhysDmgMultiSmall from '../affixes/player/prefixes/MinPhysDmgMultiSmall';
import MinPhysDmgSmall from '../affixes/player/prefixes/MinPhysDmgSmall';
import MaxPhysDmgMultiSmall from '../affixes/player/suffixes/MaxPhysDmgMultiSmall';
import MaxPhysDmgSmall from '../affixes/player/suffixes/MaxPhysDmgSmall';

export default class WoodenWand extends Weapon {
	constructor(rarity: ITEM_RARITY_TYPE_VALUE, itemLevel: number) {
		super('Wooden Wand', 'wooden_wand.png', rarity, itemLevel);
	}

	protected selfRegister(): void {
		EntityRegisterController.registerEntity(WoodenWand, 6);
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
