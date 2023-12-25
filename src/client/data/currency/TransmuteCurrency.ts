import Currency from '../../class/Currency';
import type Item from '../../class/items/Item';
import { CURRENCY_TYPES } from '../../config/currency';

export default class TransmuteCurrency extends Currency {
	constructor() {
		super(CURRENCY_TYPES.TRANSMUTE, 'Transmute', 'Makes normal item magic', 'transmute_orb.png');
	}

	public apply(item: Item): Item {
		// @TODO

		return item;
	}
}
