import Boots from '../../class/items/Boots';
import type { ITEM_RARITY_TYPE_VALUE } from '../../config/item';
import DexterityBonusSmall from '../affixes/implicits/DexterityBonusSmall';

export default class LeatherBoots extends Boots {
	constructor(rarity: ITEM_RARITY_TYPE_VALUE) {
		super(1, 'Boots', 'leather_boots.png', rarity);
	}

	protected addImplicits(): void {
		this.addAffix(new DexterityBonusSmall());
	}
}
