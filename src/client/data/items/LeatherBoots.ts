import EntityRegisterController from '../../class/controllers/EntityRegisterController';
import Boots from '../../class/items/Boots';
import type { ITEM_RARITY_TYPE_VALUE } from '../../config/item';
import DexterityBonusSmall from '../affixes/player/implicits/DexterityBonusSmall';
import MinPhysDmgMultiSmall from '../affixes/player/prefixes/MinPhysDmgMultiSmall';
import MinPhysDmgSmall from '../affixes/player/prefixes/MinPhysDmgSmall';
import MaxPhysDmgMultiSmall from '../affixes/player/suffixes/MaxPhysDmgMultiSmall';
import MaxPhysDmgSmall from '../affixes/player/suffixes/MaxPhysDmgSmall';

export default class LeatherBoots extends Boots {
	constructor(rarity: ITEM_RARITY_TYPE_VALUE, itemLevel: number) {
		super('Leather Boots', 'leather_boots.png', rarity, itemLevel);
	}

	protected selfRegister(): void {
		EntityRegisterController.registerEntity(LeatherBoots, 1);
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
