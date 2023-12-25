import Currency from '../../class/Currency';
import type Item from '../../class/items/Item';
import { CURRENCY_TYPES } from '../../config/currency';
import { ITEM_RARITY } from '../../config/item';

export default class TransmuteCurrency extends Currency {
	constructor() {
		super(CURRENCY_TYPES.TRANSMUTE, 'Transmute Orb', 'Makes normal item magic', 'transmute_orb.png');
	}

	public apply(item: Item): Item {
		if (item.getRarity() !== ITEM_RARITY.NORMAL) {
			throw new Error(`Only applicable to normal items ${item.getRarity()}`);
		}

		// Make it magic
		Object.assign(item, { rarity: ITEM_RARITY.MAGIC });

		const isPrefixGuaranteed = Math.random() < 0.5;
		const isSuffixGuaranteed = Math.random() < 0.5 || !isPrefixGuaranteed;

		item.addPrefixes(isPrefixGuaranteed ? 1 : 0, 1);
		item.addSuffixes(isSuffixGuaranteed ? 1 : 0, 1);
		item.identify();

		return item;
	}
}
