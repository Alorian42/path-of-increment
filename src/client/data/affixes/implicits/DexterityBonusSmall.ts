import type Player from '../../../class/player/Player';
import Implicit from '../../../class/affixes/Implicit';

export default class DexterityBonusSmall extends Implicit {
	constructor() {
		const text = 'Increases Dexterity by';

		super(1, text, 1, 5);
	}

	public equip(player: Player): void {
		player.modifyStat('additionalDexterity', this.getValue());
	}

	public unequip(player: Player): void {
		player.modifyStat('additionalDexterity', -this.getValue());
	}
}
