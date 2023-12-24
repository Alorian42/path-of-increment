import Boots from '../../class/items/Boots';
import DexterityBonusSmall from '../affixes/implicits/DexterityBonusSmall';

export default class LeatherBoots extends Boots {
	constructor() {
		super(1, 'Boots', 'boots.png');

		this.addAffix(new DexterityBonusSmall());
	}
}
