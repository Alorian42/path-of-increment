import type Player from '../../../../class/player/Player';
import Suffix from '../../../../class/affixes/Suffix';

export default class MaxPhysDmgMultiSmall extends Suffix {
	public static weight: number = 50;

	constructor() {
		const text = 'Increases maximum physical damage multiplier by';

		super(1, text, 0.1, 0.01);
		this.valueRound = 2;
	}

	public equip(player: Player): void {
		player.modifyStat('multiplierPhysicalDamageMax', this.getValue());
	}

	public unequip(player: Player): void {
		player.modifyStat('multiplierPhysicalDamageMax', -this.getValue());
	}
}
