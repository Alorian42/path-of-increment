import EntityRegisterController from '../../class/controllers/EntityRegisterController';
import Amulet from '../../class/items/Amulet';
import type { ITEM_RARITY_TYPE_VALUE } from '../../config/item';
import DexterityBonusSmall from '../affixes/implicits/DexterityBonusSmall';
import MinPhysDmgMultiSmall from '../affixes/prefixes/MinPhysDmgMultiSmall';
import MinPhysDmgSmall from '../affixes/prefixes/MinPhysDmgSmall';
import MaxPhysDmgMultiSmall from '../affixes/suffixes/MaxPhysDmgMultiSmall';
import MaxPhysDmgSmall from '../affixes/suffixes/MaxPhysDmgSmall';

export default class CoralAmulet extends Amulet {
	constructor(rarity: ITEM_RARITY_TYPE_VALUE, itemLevel: number) {
		super('Coral Amulet', 'coral_amulet.png', rarity, itemLevel);
	}

	protected selfRegister(): void {
		EntityRegisterController.registerEntity(CoralAmulet, 8);
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
